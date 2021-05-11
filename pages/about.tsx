import Link from 'next/link'

function About() {
  return (
    <>
      <div>About</div>
      <Link href="/home">
        <a>Go to home</a>
      </Link>
    </>
  )

}

export default About