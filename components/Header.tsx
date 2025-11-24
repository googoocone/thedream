import { createClient } from "@/utils/supabase/server";
import Navigation from "./Navigation";

export default async function Header() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    return (
        <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
            <Navigation user={user} />
        </header>
    );
}
