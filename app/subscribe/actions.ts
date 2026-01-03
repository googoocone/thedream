'use server';

export async function subscribeToNotification(email: string) {
    // Placeholder: In a real app, insert into 'subscribers' table.
    // const { error } = await supabase.from('subscribers').insert({ email });
    console.log(`New subscriber: ${email}`);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return { success: true };
}
