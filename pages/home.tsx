import Link from 'next/link'

function HomePage() {
    return (
        <>
            <h1>Welcome to Next.js!</h1>
            <Link href="/about">
                <a>Go to about</a>
            </Link>
        </>
    )
}

export default HomePage