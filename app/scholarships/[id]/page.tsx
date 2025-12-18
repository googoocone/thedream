import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import ScholarshipDetailClient from "@/components/scholarship/ScholarshipDetailClient";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { id } = await params;

    // fetch data
    const supabase = await createClient();
    const { data: scholarship } = await supabase
        .from("scholarships")
        .select("name, foundation")
        .eq("id", id)
        .single();

    if (!scholarship) {
        return {
            title: "장학금을 찾을 수 없습니다",
        };
    }

    return {
        title: scholarship.name,
        description: `${scholarship.foundation}에서 제공하는 ${scholarship.name} 상세 정보입니다.`,
        openGraph: {
            title: scholarship.name,
            description: `${scholarship.foundation} - ${scholarship.name}`,
            url: `/scholarships/${id}`,
        },
    };
}

export default async function ScholarshipDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    return <ScholarshipDetailClient id={id} />;
}
