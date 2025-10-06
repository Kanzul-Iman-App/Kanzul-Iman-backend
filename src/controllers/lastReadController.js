import { LastRead } from "../db/LastRead.model.js";
import { User } from "../db/User.model.js";
/*
STEPS 
Find the user 
book id
user id 
*/

const lastreadProgress = async (req, res) => {
    try {

        const { bookId } = req.body
        const userId = req.user._id


        if (!bookId) {
            return res.status(400).json({ message: "bookId is required" });
        }

        const userLastRead = await LastRead.findOneAndUpdate({ userId: userId },
            {
                $set: {
                    userId: userId,
                    lastRead: bookId
                }
            },
            { new: true, upsert: true }
        )


        if (!userLastRead) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        return res.status(200).json({
            "success": true,
            "data": { userLastRead },
            "message": "last read updated "
        })


    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: 'Server error. Please try again later'
        })
    }
}



const getlastreadProgress = async (req, res) => {
    try {
        const userId = req.user._id

        const progress = await LastRead.findOne({ userId: userId }).populate('lastRead')


        if (!progress) {
            
            return res.status(401).json(
                {
                    "success": false,
                    "error": "no Reading progress found for the user"
                })
            }
            
            return res.status(200).json({
                "success": true,
                "data": progress,
                "message": "the progress of the user is fetched successfully"
            })
            
            
            
            
            
        } catch (error) {
            console.log(error);
            return res.status(500).json(
                {
                    "success": false,
                    "error": "Server error . Please try again later"
                })
    }
}

export { lastreadProgress }
export { getlastreadProgress }