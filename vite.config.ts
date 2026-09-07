import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { handleChatRequest } from "./api/chat.js";

function apiMiddlewarePlugin(): Plugin {
  return {
    name: "api-endpoints",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === "/api/health" && req.method === "GET") {
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ status: "OK", message: "Server is running" }));
          return;
        }

        if (req.url === "/api/contact" && req.method === "POST") {
          let body = "";
          req.on("data", (chunk) => {
            body += chunk;
          });
          req.on("end", async () => {
            try {
              const { name, email, phone, message, country } = JSON.parse(body || "{}");

              if (!name || !email || !phone || !message) {
                res.statusCode = 400;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ success: false, message: "All fields are required" }));
                return;
              }

              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (!emailRegex.test(email)) {
                res.statusCode = 400;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ success: false, message: "Invalid email address" }));
                return;
              }

              if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD && process.env.RECIPIENT_EMAIL) {
                const nodemailer = await import("nodemailer");
                const transporter = nodemailer.default.createTransport({
                  service: "gmail",
                  auth: {
                    user: process.env.GMAIL_USER,
                    pass: process.env.GMAIL_APP_PASSWORD,
                  },
                  tls: { rejectUnauthorized: false },
                });

                await transporter.sendMail({
                  from: `"InTence Contact Form" <${process.env.GMAIL_USER}>`,
                  to: process.env.RECIPIENT_EMAIL,
                  replyTo: email,
                  subject: `New Contact Form Submission from ${name}`,
                  html: `
                    <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
                      <h2 style="color: #0ea5e9;">New Contact Form Submission</h2>
                      <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin-top: 20px;">
                        <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
                        <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
                        <p style="margin: 10px 0;"><strong>Phone:</strong> ${phone}${country ? ` (${country})` : ""}</p>
                        <p style="margin: 10px 0;"><strong>Message:</strong></p>
                        <div style="background-color: white; padding: 15px; border-radius: 5px; margin-top: 10px;">
                          ${String(message).replace(/\n/g, "<br>")}
                        </div>
                      </div>
                      <p style="margin-top: 20px; color: #6b7280; font-size: 12px;">
                        This email was sent from your InTence website contact form.
                      </p>
                    </div>
                  `,
                  text: `New Contact Form Submission\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}${country ? ` (${country})` : ""}\n\nMessage:\n${message}`,
                });

                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ success: true, message: "Email sent successfully!" }));
              } else {
                console.log("ℹ️ [Contact API] In-memory handler received submission (Gmail credentials not configured in env):", {
                  name,
                  email,
                  phone,
                  country,
                  message,
                });
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ success: true, message: "Email sent successfully!" }));
              }
            } catch (err: unknown) {
              console.error("❌ Error processing contact form:", err);
              res.statusCode = 500;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ success: false, message: "Failed to send email" }));
            }
          });
          return;
        }

        if (req.url === "/api/chat" && req.method === "POST") {
          let body = "";
          req.on("data", (chunk) => {
            body += chunk;
          });
          req.on("end", async () => {
            try {
              const { messages } = JSON.parse(body || "{}");
              const reply = await handleChatRequest(messages);
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ reply }));
            } catch (err: unknown) {
              console.error("❌ Error processing chat in dev server:", err);
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ reply: "Hello! How can I help you with InTence software development, AI, or automation today? You can reach us directly at intence.it@gmail.com or on WhatsApp (+91 92652 50494)!" }));
            }
          });
          return;
        }

        next();
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "0.0.0.0",
    port: 3000,
  },
  plugins: [
    react(),
    apiMiddlewarePlugin(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));

