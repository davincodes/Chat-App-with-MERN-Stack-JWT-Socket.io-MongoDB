import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
    try{
        const {fullName, username, password, confirmPassword, gender} = req.body;

        if(password !== confirmPassword){
            return res.status(400).json({error: "Password don't match"});
        }

        
        const user = await User.findOne({username}) //check if username exist
        
        if(user){ //if existed will run this.
            return res.status(400).json({error: "Username already exist"});
        }

        //HASH PASSWORD
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        //https://avatar-placeholder.iran.liara.run/
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User ({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender == "male" ? boyProfilePic : girlProfilePic        
        });

    if(newUser){
        await newUser.save();

        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            profilePic: newUser.profilePic
        });
    }else{
        res.status(400).json({error: "Invalid user data"});
    }

    } catch(error){
        console.log("error in signup controller", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
    
}

export const login = (req, res) => {
    console.log("loginUser");
    
}

export const logout = (req, res) => {
    console.log("logoutUser");
    
}



