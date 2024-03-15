"use client"


import Link from "next/link";

export default function ContactToAdmin() {

	return (
		<section className="cta">	
			<p className="cta-text">Have a project in mind? <br className="hidden sm:block" />
				Let's build something together!</p>
			<Link href= {"/contact"} className="btn">Contact</Link>
		</section>
	)
}