import dns from "dns";
import mongoose from "mongoose";

// Some local networks/VPNs register a DNS proxy that doesn't support SRV
// record lookups, which mongodb+srv:// URIs require. Fall back to a public
// resolver so Atlas SRV discovery works regardless of the OS DNS config.
dns.setServers(["8.8.8.8", "1.1.1.1", ...dns.getServers()]);

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/machmangsho`);
        console.log('MongoDB connected successfully');
        mongoose.connection.on('connected', () => {
            console.log('MongoDB reconnected');
        });
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
};

export default connectDB;
export { connectDB };