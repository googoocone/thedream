import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import ScholarshipDetailClient from "@/components/scholarship/ScholarshipDetailClient";

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
