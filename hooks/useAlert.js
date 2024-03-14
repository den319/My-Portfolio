"use client"

import {useState} from "react";

export default function useAlert() {

	const [alert, setAlert]= useState({
		show: false,
		text: "",
		type: "danger",
	});

	const showAlert= ({text, type="danger"}) => setAlert({
		show: true,
		text, 
		type,
	})

	const hideAlert= ({text, type="danger"}) => setAlert({
		show: false,
		text: "", 
		type: "danger",
	})

	return {alert, showAlert, hideAlert};
}