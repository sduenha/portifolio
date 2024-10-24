# AcademyNet
#### Video Demo: https://youtu.be/pyukyD7awuk
#### Description:
This project is a Studio Course Management System developed to facilitate the organization and management of classes, instructors, and students within a studio environment. The system provides an intuitive, responsive web interface to manage daily schedules, track registered students, and handle the operations related to instructors and courses. The front-end is built using HTML, CSS, JavaScript, while the back-end is powered by Flask with Python.

Features
1. Timeline Calendar View
Displays a daily schedule in the form of a chronological timeline.
For each event, the following information is displayed:
Class name: The title or name of the class/event.
Instructor's name: The name of the instructor conducting the class.
Number of registered students: Current number of students registered for the class.
Maximum student capacity: The maximum number of students allowed for the class.
Class timings: Start and end times for the event.
The events are displayed in the order they will occur throughout the day, giving a clear and concise view of the studio's daily schedule.

2. Instructor Management Page
A dedicated page to manage instructors efficiently.
In the central area, all registered instructors are displayed in a list or grid format.
In the sidebar, there is a form to add new instructors.
Upon clicking an existing instructor, you can:
Edit the instructor's details such as name, email, or other relevant information.
Delete the instructor from the system if no longer needed.
The management interface is designed to be simple, enabling quick additions, edits, or deletions of instructors without navigating away from the page.

3. Student Management Page
Similar in structure to the Instructor Management Page, but focused on students.
In the central area, all registered students are displayed, showing relevant details like name, contact information.
The sidebar contains a form to add new students.
Clicking on an existing student allows you to:
Edit the student’s information.
Delete the student from the database.
This page is designed for quick access and modification of student records, ensuring efficient student management.

4. Course Management Page
A page dedicated to handling the courses offered by the studio.

In the main area, all available courses are displayed along with relevant details such as:

Course name.
Instructor assigned to the course.
Number of registered students.
Maximum capacity.
The sidebar features a form to add new courses.

Clicking on a course allows you to:

Edit the course’s information (e.g., change the instructor, update timings, etc.).
Delete the course from the system.
Add students to the course in real-time, with the system ensuring that the number of enrolled students does not exceed the course's capacity.
The course page is dynamic, with real-time updates for student enrollment and adjustments.

Technologies Used
Front-End:

HTML and CSS for structuring and styling the web pages.
JavaScript for client-side interactivity and dynamic content updates.
Back-End:

Python with Flask framework for server-side logic and data handling.
Database:

SQLite database to store and manage data for instructors, students, courses, and events.
Fetch: Used for real-time updates and asynchronous data fetching, ensuring that actions such as adding students or modifying course details happen without full page reloads.

Database Structure
The system uses SQLite as the primary database. The database consists of several key tables:

Instructors: Stores information about all instructors (e.g., name, contact details, etc.).
Students: Contains data on all students registered in the system.
Courses: Holds course information, including instructor assignment and student registrations.

Responsiveness
The website is fully responsive, ensuring a seamless experience across devices such as desktops, tablets, and mobile phones. Responsive design techniques, including media queries and flexbox/grid layouts, have been used to optimize the display for different screen sizes.

Real-Time Functionality
The system supports real-time updates when adding or editing students in the course management page. For example, when adding students to a course, the interface is updated immediately without requiring a page refresh.
This is achieved using JavaScript Fetch API for asynchronous operations, making the system more dynamic and user-friendly.

Future Enhancements
While the current system is fully functional, there are several potential areas for future development:

User Authentication: Implement secure login and role-based access control (e.g., for admins, instructors).
Attendance Tracking: Add features for tracking student attendance for each class, including visual reports.
Real-Time Notifications: Enable real-time notifications for instructors and students regarding schedule changes or new registrations.
Enhanced Analytics: Provide deeper insights and reporting on student performance, instructor workloads, and course popularity.
