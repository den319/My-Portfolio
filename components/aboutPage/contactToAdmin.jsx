"use client"


import Link from "next/link";
import Image from "next/image";
import {socialLinks} from "@/constants/utils";

export default function ContactToAdmin() {

	return (
		<section className="cta">	
			<p className="cta-text">Have a project in mind? <br className="hidden sm:block" />
				Let's build something together!</p>

			<div className="flex items-center">	
				{
					socialLinks.map(item => {
						const {name, iconPath, link}= item;

						return (
							<Link key= {name} href= {link} target= {name !== "Contact" ? "_blank" : ""} 
								className="font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center sm:w-auto">
								<Image 
									src= {iconPath}
									alt= {name}
									height= {40}
									width= {40} 
									className="w-[50px] h-[50px]"
								/>
							</Link>
						)
					})
				}
			</div>
		</section>
	)
}