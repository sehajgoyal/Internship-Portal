import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { User } from "./models/user.model.js";
import { Company } from "./models/company.model.js";
import { Job } from "./models/job.model.js";
dotenv.config();
const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected for seeding...");
    await Job.deleteMany({});
    await Company.deleteMany({});
    const existingRecruiter = await User.findOne({ email: "recruiter@internshipportal.com" });
    if (existingRecruiter) {
      await User.deleteOne({ email: "recruiter@internshipportal.com" });
    }
    const hashedPassword = await bcrypt.hash("password123", 10);
    const recruiter = await User.create({
      fullname: "Portal Recruiter",
      email: "recruiter@internshipportal.com",
      phoneNumber: "9999999999",
      password: hashedPassword,
      pancard: "SEED12345A",
      adharcard: "999999999999",
      role: "Recruiter",
      profile: {
        bio: "Official recruiter account for seeding internships",
        profilePhoto: "",
      },
    });
    console.log("✅ Recruiter created");
    const companies = await Company.insertMany([
      {
        name: "Google",
        description: "A global technology leader specializing in search, cloud, and AI.",
        website: "https://careers.google.com",
        location: "Bangalore",
        logo: "https://logo.clearbit.com/google.com",
        userId: recruiter._id,
      },
      {
        name: "Microsoft",
        description: "World's leading software company building cloud and productivity tools.",
        website: "https://careers.microsoft.com",
        location: "Hyderabad",
        logo: "https://logo.clearbit.com/microsoft.com",
        userId: recruiter._id,
      },
      {
        name: "Amazon",
        description: "Global e-commerce and cloud computing giant.",
        website: "https://amazon.jobs",
        location: "Bangalore",
        logo: "https://logo.clearbit.com/amazon.com",
        userId: recruiter._id,
      },
      {
        name: "Flipkart",
        description: "India's leading e-commerce marketplace.",
        website: "https://www.flipkartcareers.com",
        location: "Bangalore",
        logo: "https://logo.clearbit.com/flipkart.com",
        userId: recruiter._id,
      },
      {
        name: "Razorpay",
        description: "India's leading fintech company for payment solutions.",
        website: "https://razorpay.com/careers",
        location: "Bangalore",
        logo: "https://logo.clearbit.com/razorpay.com",
        userId: recruiter._id,
      },
      {
        name: "Zomato",
        description: "India's top food delivery and restaurant discovery platform.",
        website: "https://www.zomato.com/careers",
        location: "Gurugram",
        logo: "https://logo.clearbit.com/zomato.com",
        userId: recruiter._id,
      },
    ]);
    console.log(`✅ ${companies.length} companies created`);
    const jobs = await Job.insertMany([
      {
        title: "Frontend Developer Intern",
        description: "Build beautiful user interfaces using React.js and modern CSS frameworks. Work with the design team to implement responsive, pixel-perfect UIs.",
        requirements: ["React.js", "HTML/CSS", "JavaScript", "Git"],
        salary: "6",
        experienceLevel: 0,
        location: "Bangalore",
        jobType: "Full-time",
        position: 5,
        company: companies[0]._id, 
        created_by: recruiter._id,
        applications: [],
      },
      {
        title: "Backend Developer Intern",
        description: "Design and develop RESTful APIs and microservices. Work with Node.js, Express, and MongoDB to build scalable backend systems.",
        requirements: ["Node.js", "Express", "MongoDB", "REST APIs"],
        salary: "8",
        experienceLevel: 0,
        location: "Hyderabad",
        jobType: "Full-time",
        position: 3,
        company: companies[1]._id, 
        created_by: recruiter._id,
        applications: [],
      },
      {
        title: "Full Stack Developer Intern",
        description: "End-to-end development of web applications. Build features from database design to frontend implementation using the MERN stack.",
        requirements: ["React", "Node.js", "MongoDB", "Express", "TypeScript"],
        salary: "10",
        experienceLevel: 1,
        location: "Bangalore",
        jobType: "Full-time",
        position: 2,
        company: companies[2]._id, 
        created_by: recruiter._id,
        applications: [],
      },
      {
        title: "Data Science Intern",
        description: "Analyze large datasets to extract actionable insights. Build machine learning models and create data visualizations for business decisions.",
        requirements: ["Python", "Pandas", "Machine Learning", "SQL"],
        salary: "7",
        experienceLevel: 0,
        location: "Bangalore",
        jobType: "Full-time",
        position: 4,
        company: companies[3]._id, 
        created_by: recruiter._id,
        applications: [],
      },
      {
        title: "DevOps Engineer Intern",
        description: "Manage CI/CD pipelines, containerize applications with Docker, and deploy to cloud platforms. Automate infrastructure provisioning.",
        requirements: ["Docker", "AWS", "Linux", "CI/CD", "Kubernetes"],
        salary: "9",
        experienceLevel: 1,
        location: "Pune",
        jobType: "Full-time",
        position: 2,
        company: companies[0]._id, 
        created_by: recruiter._id,
        applications: [],
      },
      {
        title: "UI/UX Design Intern",
        description: "Create intuitive user experiences and stunning visual designs. Conduct user research, build wireframes, and prototype interactions in Figma.",
        requirements: ["Figma", "Adobe XD", "User Research", "Prototyping"],
        salary: "5",
        experienceLevel: 0,
        location: "Mumbai",
        jobType: "Part-time",
        position: 3,
        company: companies[4]._id, 
        created_by: recruiter._id,
        applications: [],
      },
      {
        title: "Machine Learning Intern",
        description: "Develop and train ML models for recommendation systems and NLP. Work with TensorFlow and PyTorch on real-world production datasets.",
        requirements: ["Python", "TensorFlow", "PyTorch", "NLP", "Statistics"],
        salary: "12",
        experienceLevel: 1,
        location: "Bangalore",
        jobType: "Full-time",
        position: 2,
        company: companies[1]._id, 
        created_by: recruiter._id,
        applications: [],
      },
      {
        title: "Mobile App Developer Intern",
        description: "Build cross-platform mobile applications using React Native. Implement features, optimize performance, and publish to app stores.",
        requirements: ["React Native", "JavaScript", "iOS", "Android"],
        salary: "7",
        experienceLevel: 0,
        location: "Gurugram",
        jobType: "Full-time",
        position: 3,
        company: companies[5]._id, 
        created_by: recruiter._id,
        applications: [],
      },
      {
        title: "Cybersecurity Intern",
        description: "Perform vulnerability assessments, security audits, and penetration testing. Help secure cloud infrastructure and web applications.",
        requirements: ["Network Security", "Linux", "Python", "OWASP"],
        salary: "8",
        experienceLevel: 0,
        location: "Chennai",
        jobType: "Full-time",
        position: 2,
        company: companies[2]._id, 
        created_by: recruiter._id,
        applications: [],
      },
      {
        title: "Product Management Intern",
        description: "Define product roadmaps, gather user requirements, and work with engineering teams to ship features. Analyze metrics and drive product growth.",
        requirements: ["Product Strategy", "Analytics", "Communication", "Agile"],
        salary: "6",
        experienceLevel: 0,
        location: "Remote",
        jobType: "Part-time",
        position: 2,
        company: companies[4]._id, 
        created_by: recruiter._id,
        applications: [],
      },
    ]);
    console.log(`✅ ${jobs.length} internships created`);
    console.log("\n🎉 Seeding complete! Your portal now has sample data.");
    console.log("   You can now refresh http://localhost:5173 to see the internships.\n");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
    process.exit(1);
  }
};
seedData();
