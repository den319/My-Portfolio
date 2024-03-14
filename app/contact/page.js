"use client"


import Loader from "@/components/loaders/loader";
import { Canvas } from "@react-three/fiber";
import {useState, Suspense, useRef} from "react";
import emailjs from "@emailjs/browser";
import dynamic from "next/dynamic";


// lazy loading
const Fox= dynamic(() => import("@/models/fox"), {
  ssr:false,
})

export default function Contact() {

  const [form, setForm]= useState({
    name: "",
    email: "",
    message: "",
  });

  const [isLoading, setIsLoading]= useState(false);
  const [currAnimation, setCurrAnimation]= useState("idle");

  const formRef= useRef();

  const handleChange= (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  };

  const handleFocus= (e) => {
    setCurrAnimation("walk");
  }
  const handleBlur= (e) => {
    setCurrAnimation("idle");
  }
  const handleSubmit= (e) => {
    e.preventDefault();
    setIsLoading(true);
    setCurrAnimation("hit");

    emailjs.send(
      import.meta.env.EMAILJS_SERVICE_ID,
      import.meta.env.EMAILJS_TEMPLATE_ID,
      {
        from_name: form.name,
        to_name: "Dharmik",
        from_email: form.email,
        to_email: "17me090.dharmik.vora@gmail.com",
        message: form.message,
      },
      import.meta.env.EMAILJS_PUBLIC_KEY,
    ).then(() => {
      setTimeout(() => {
        setIsLoading(false);
        setCurrAnimation("idle");
        setForm({name: "", email: "", message: ""})  
      }, [3000]);
      
    }).catch((error) => {
      setIsLoading(false);
      setCurrAnimation("idle");
    })
  }

  return (
    <section className="relative flex flex-col max-container lg:flex-row">
      <div className="flex flex-col flex-1 min-w-[50%]"> 
        <h1 className="head-text">Get in Touch</h1>

        <form 
          className="w-full flex flex-col gap-7 mt-14"
          onSubmit= {handleSubmit}
          >
          <label className="text-black-500 font-semibold">
            Name
            <input
              type="text"
              name="name"
              className="input"
              placeholder="Enter Your Name"
              required
              value={form.name}
              onChange={handleChange}
              onFocus= {handleFocus}
              onBlur= {handleBlur}
            />
          </label>

          <label className="text-black-500 font-semibold">
            Email
            <input
              type="email"
              name="email"
              className="input"
              placeholder="myemail@gmail.com"
              required
              value={form.email}
              onChange={handleChange}
              onFocus= {handleFocus}
              onBlur= {handleBlur}
            />
          </label>

          <label className="text-black-500 font-semibold">
            Your Message
            <textarea
              name="message"
              rows={4}
              className="textarea"
              placeholder="Let me know how I can help you!"
              required
              value={form.message}
              onChange={handleChange}
              onFocus= {handleFocus}
              onBlur= {handleBlur}
            />
          </label>

          <button
            type="submit"
            className="btn"
            disabled={isLoading}
            onFocus={handleFocus}
            onBlur={handleBlur}
          >
            {isLoading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>

      <div className="w-full h-[350px] md:h-[550px] lg:w-[50%] lg:h-auto">
        <Canvas camera={{
            position:[0,0,5],
            fov: 75,
            near:0.1,
            far:1000,
          }}>
          <directionalLight intensity={2.5} position={[0,0,1]} />
          <ambientLight intensity={0.4} />
          <Suspense fallback={<Loader />}>
            <Fox 
              currAnimation= {currAnimation}
              position= {[0.5,0.35,0]}
              rotation= {[12.6,-0.6,0]}
              scale= {[0.5,0.5,0.5]}
            />
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
}