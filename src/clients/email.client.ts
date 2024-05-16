export async function sendEmail({subject, emailContent}:{subject: string, emailContent: string}): Promise<boolean> {
    const currentOrigin = process.env.APP_URL ?? process.env.NEXT_PUBLIC_APP_URL;
    const url = new URL('/email/api', currentOrigin);
    const res = await fetch(url, { 
            method: 'POST',
            body: JSON.stringify({
                subject,
                emailContent,
              })
    })

    if (!res.ok) {
        throw new Error('Failed to send email')
    }

    return res.json() as Promise<boolean>
}