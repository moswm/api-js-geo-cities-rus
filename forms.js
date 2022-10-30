/*
 * api-js-geo-cities-rus / Selection of cities and regions by API (Russian language)
 * Copyright (C) 2022 Baev
 *
 * MIT License
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * 
 * GNU General Public License, version 2
 * This program is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation; either version 2 of the License, or (at your option) any later version.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License along with this program; if not, write to the Free Software Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 * 
*/

function forms_CityPrompt(citytype) {
	let cityname=document.getElementById("forms-"+citytype).value;
	if (cityname.length>1) {
		api_cities_prompt(cityname,"forms_CityPrompt_exec",citytype);
	} else {
		let listbody=document.getElementById("forms-"+citytype+"-list");
		listbody.innerHTML="";
		listbody.style.display="none";
	}
}

function forms_CityPrompt_exec(citytype,jsondata) {
	document.getElementById("forms-basecity-json").innerHTML=jsondata;
	let listbody=document.getElementById("forms-"+citytype+"-list");
	listbody.innerHTML="";
	let CityPrompt_list = JSON.parse(jsondata).cities;
	if (typeof CityPrompt_list!=='undefined') {
		for (var cityid in CityPrompt_list) {
			let cityinf=CityPrompt_list[cityid];
			let cityVal=cityinf.name_city+", "+cityinf.name_region;
			let cityValLst=cityVal;
			if (cityinf.name_city==cityinf.name_region) {
				cityVal=cityinf.name_city;
				cityValLst="<b>"+cityVal+"</b>";
			}
			let cityitem = document.createElement("div");
			cityitem.onclick=function() { forms_CityPrompt_SetValue(citytype,cityVal) }
			cityitem.innerHTML=cityValLst;
			listbody.appendChild(cityitem);
		}
		listbody.style.display="block";
	} else {
		listbody.style.display="none";
	}
}

function forms_CityPrompt_SetValue(citytype,cityVal) {
	alert("Вы выбрали: "+cityVal);
	document.getElementById("forms-"+citytype).value=cityVal;
	let listbody=document.getElementById("forms-"+citytype+"-list");
	listbody.innerHTML="";
	listbody.style.display="none";
}
