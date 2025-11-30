import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import ScholarshipDetailClient from "@/components/scholarship/ScholarshipDetailClient";

export default async function ScholarshipDetailPage({ params }: { params: { id: string } }) {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    return <ScholarshipDetailClient id={params.id} />;
}
