"use client"


import Link from "next/link";
import Image from "next/image";

function InfoBox({text, link, btnText}) {

	return (
		<div className="info-box">
			<p className="font-medium text-center sm:text-lg">
				{text}
			</p>

			<Link href={link} className="neo-brutalism-white neo-btn">
				{btnText}
				<div className="w-4 h-4 object-contain">
					<Image
						src="/3D_assets/icons/arrow.svg"
						height={48}
						width={48}
						alt="left arrow"
					/>
				</div>
			</Link>
		</div>
	)
}

const renderContent= {
	1: (
		<h1 className="text-center neo-brutalism-blue py-4 px-8 text-white mx-5
			sm:text-lg sm:leading-snug">
			Hi, I am <span> Dharmik </span>
			<br/>
			A Software Engineer from India.
		</h1>
	),
	2: (
		<InfoBox
			text= "Worked with companies and learned many skills along the way"
			link="/about"
			btnText="Learn More"
		/>
	),
	3: (
		<InfoBox
			text= "Built multiple projects over the year. Curious about the impact?"
			link="/projects"
			btnText="Visit my portfolio"
		/>
	),
	4: (
		<InfoBox
			text= "Need a project done or looking for a dev? I am just a few keystrokes away."
			link="/contact"
			btnText="Let's talk"
		/>
	),
}

export default function Popup({currentStage}) {
	return renderContent[currentStage] || null;
}