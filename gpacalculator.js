// SOEN 287 - Assignment #3
// By: Cathryn Griffiths
//
// calculator.js
// this javascript file contains functions used by gpacalculator.html
//

// Global variables
var cgpa; 	// for storing cumulative GPA
var courseArray =[]; 	// for storing course information 


// to add a new course
// NOTE: uses functions defined elsewhere in gpacalculator.js
function add() {

	if (validateCredits() != true | validateGrade() != true) {
		return;     // if there is no valid credit and grade input, then the function does not run
	}

	var newCourse = new Object(); 	// create new object
	newCourse.name = document.getElementById("courseName").value;
	newCourse.credits = parseFloat(document.getElementById("credits").value);
	newCourse.grade = document.getElementById("grade").value;
	newCourse.gpa = calculateCourseGPA(newCourse.grade);
	courseArray.push(newCourse); 	// add course to course array
	calculateCumulGPA();	// calculate the cumulative GPA
	displayCumulGPA();      // display the cumulative GPA
	displayCourses();       // display the course array
}

// to display courses
function displayCourses() {
	var toDisplay = "";
	
	for (var i in courseArray) {
		toDisplay+="<tr><td>" + i + "</td><td>" + courseArray[i].name + "</td><td>" + courseArray[i].credits + "</td><td>" + courseArray[i].grade + "</td><td>" + courseArray[i].gpa + "</td></tr>";
	}

	document.getElementById("display").innerHTML = toDisplay;

}

// to validate the number of credits
function validateCredits() {
	var credits = document.getElementById("credits").value;
    var pattern = /^[\d]+[\.]?[\d]{0,}$/;   // credits must have 1 or more digits, followed by 0 or 1 decimal points, followed by 0 or more digits
	if (!pattern.test(credits) || credits > 15 ) {
		alert("Invalid number of credits entered. Please try again.");
		return false;
	}
	return true;
}

// to validate the grade
function validateGrade() {
	var grade = document.getElementById("grade").value;
    var pattern = /^[A,B,C,D,F,a,b,c,d,f][\+,\-]?$/;
	if (!pattern.test(grade)) {
		alert("Invalid grade entered. Please try again.");
		return false;
	}
	return true;
}

// to calculate a course's GPA
function calculateCourseGPA(someGrade) {
	
	someGrade = someGrade.toUpperCase();
	
	switch(someGrade) {
		case 'A+': 	return 4.30;
		case 'A': 	return 4.00;
		case 'A-': 	return 3.70;
		case 'B+': 	return 3.30;
		case 'B': 	return 3.00;
		case 'C+': 	return 2.30;
		case 'C': 	return 2.00;
		case 'C-': 	return 1.70;
		case 'D+': 	return 1.30;
		case 'D': 	return 1.00;
		case 'D-': 	return 0.70;
		case 'F': 	return 0; 
	}
	
}

// to calculate the cumulative GPA
function calculateCumulGPA() {
	cgpa = 0;
	var totalCredits=0;
	for (var i=0; i<courseArray.length; i++) {
		cgpa = cgpa + courseArray[i].gpa*courseArray[i].credits;
		totalCredits +=courseArray[i].credits;
	}
	cgpa=(cgpa/totalCredits).toFixed(2);
}

// to display the cumulative GPA
function displayCumulGPA() {
	if (cgpa == undefined) {
		document.getElementById("cgpa").innerHTML = "N/A";
		return;
	}
	else if(isNaN(cgpa)) {
			document.getElementById("cgpa").innerHTML = "N/A";
			return;
		}
	else {		
		document.getElementById("cgpa").innerHTML = cgpa;
		return;
	}
	
}

// to delete a course 
function deleteCourse() {
	if (courseArray.length == 0) {
		alert("You have no courses to delete.");
	}
	else {
		var courseToDelete=Number(prompt("What course would you like to delete? NOTE: You must enter the number that appears in the # column. Do NOT enter the name of the course."));

		while (courseToDelete<0 || courseToDelete>courseArray.length-1) {
			courseToDelete=Number(prompt("There was an error with the course you wanted to delete. Please enter the number (the number that appears in the # column) of the course you want to delete again."));
		}

		courseArray[courseToDelete]=null;   // removed course from the array

		// create a new array without the course
		var newArray=[];

		for (var i=0,j=0; i<courseArray.length; i++) {
			if (courseArray[i]!=null) {
				newArray[j]=courseArray[i];
				j++;
			}
		}

		courseArray=newArray;   // assign new array to courseArray

		calculateCumulGPA();
		displayCumulGPA();
		displayCourses();

	}

	
}

// to "Reset"/"Clear" the courses
function reset() {
	courseArray = [];
	cgpa = undefined;
	displayCourses();
	displayCumulGPA();
}

