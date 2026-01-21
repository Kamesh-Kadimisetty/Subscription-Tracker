import nodemailer from 'nodemailer';
import { EMAIL_PASSWORD } from './env.js';

export const accountEmail="323103311022@gvpce.ac.in";
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user:accountEmail,
        pass:EMAIL_PASSWORD
    }
});

export default transporter;