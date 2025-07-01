# ATSResume

A cutting-edge resume builder that helps job seekers create a professional, ATS-friendly resume in minutes. Our platform uses the latest technology to analyze and optimize your resume for maximum visibility and success with applicant tracking systems. Say goodbye to frustration and wasted time spent on manual resume formatting. Create your winning resume with ATSResume today and get noticed by employers.

## Demo

#### [https://atsresume.vercel.app/](https://atsresume.vercel.app/)
![image](https://user-images.githubusercontent.com/61316762/218017511-fbbaa7da-6154-449f-9e46-8de45b0e6c29.png)

### Resume Score
#### https://www.resumego.net/resume-checker/
![image](https://user-images.githubusercontent.com/61316762/218143206-f0e5e764-52bc-4c25-84f2-6b2fff00cd4b.png)

## Change Log

- Drag and drop sections to reorder them in the resume(Work Experience, Projects, Skills)

## Sections

- [Personal Information](#personal-information)
- [Social Media](#social-media)
- [Summary](#summary)
- [Education](#education)
- [Work Experience](#work-experience)
- [Projects](#projects)
- [Technical Skills](#technical-skills)
- [Soft Skills](#soft-skills)
- [Languages](#languages)
- [Additional Skills](#additional-skills)
- [Certifications](#certifications)

## Personal Information

- Name
- Email
- Phone
- Address
- Profile Picture

## Social Media

- Social Media Links

## Summary

- Summary

## Education

- Degree
- Institute
- Start Date
- End Date

## Work Experience

- Company
- Designation
- Description
- Key Achievements
- Start Date
- End Date

Description optional

## Projects

- Project Name
- Description
- key Achievements
- Start Date
- End Date

Description optional

## Technical Skills

- Technical Skills

## Soft Skills

- Soft Skills

## Languages

- Languages

## Additional Skills

- Additional Skills

## Certifications

- Certifications

## How to Add Key Achievements

Key achievements are the most important part of your resume. 

- Add key achievements to your resume to make it more attractive and increase your chances of getting noticed by employers.
- Add key achievements to your work experience and projects.
- Add key achievements to your resume by clicking on the new line.

## PageSpeed Insights

![image](https://user-images.githubusercontent.com/61316762/218244257-e85172dc-46bd-4f4b-b9c2-9bd17c693cc8.png)

![image](https://user-images.githubusercontent.com/61316762/218244267-c46f5d02-b742-4b4c-ba7e-ae1bfb1e04d4.png)

## License

[MIT](https://github.com/m-hassan-raza/ats-resume/blob/main/LICENSE.md)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Authors and acknowledgment

- [Saurav Hathi](https://github.com/sauravhathi)

## Updates

This project has undergone significant updates since its original fork. Below is a summary of the enhancements made:

### Multi-Resume Management System
- Implemented a complete resume management system with a dashboard.
- Features include creating, editing, deleting, duplicating resumes with local storage.
- Added auto-save functionality with debouncing.
- Enabled resume naming and renaming capabilities.

### Bug Fixes
- Resolved critical list item removal bugs across all form components.
- Fixed React key mismatch issues in Education, WorkExperience, and Projects.
- Corrected property name inconsistencies (e.g., name vs title).
- Implemented proper unique ID generation for all list items.
- Added stable React keys for consistent rendering.

### UI Enhancements
- Added individual remove buttons with proper hover effects.
- Replaced fuchsia color scheme with a professional slate theme.
- Improved form layout with borders and spacing.
- Added loading states and error handling.

### Keyboard Shortcut Fixes
- Fixed runtime errors related to keyboard shortcuts.
- Added null checks for event.key and key parameters.
- Prevented TypeError when pasting content in text fields.

### Print Functionality Improvements
- Excluded navigation elements from print output.
- Added proper CSS classes for print media queries.

### Context API Integration
- Implemented ResumeContext for form data.
- Added ResumesContext for multi-resume management.
- Fixed infinite re-render loops with useCallback.

### Data Persistence and Validation
- Implemented localStorage-based resume storage.
- Added data migration for legacy resume format.
- Ensured backward compatibility with existing data.

## Acknowledgment

This project is a fork of the original work by Saurav Hathi (<https://github.com/sauravhathi>).
