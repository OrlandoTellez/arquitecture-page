export const prerender = false;

import type { APIRoute } from "astro";
import nodemailer from "nodemailer";

const GMAIL_PASSWORD = import.meta.env.GMAIL_PASSWORD;
const GMAIL_USER = import.meta.env.GMAIL_USER;

console.log(GMAIL_PASSWORD, GMAIL_USER);

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.formData();
    const nombre = data.get("nombre");
    const apellidos = data.get("apellidos");
    const correo = data.get("correo");
    const mensaje = data.get("mensaje");

    if (typeof correo !== "string") {
      return new Response(JSON.stringify({ error: "Correo inválido" }), {
        status: 400,
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Formulario Web" <${GMAIL_USER}>`,
      to: GMAIL_USER,
      replyTo: typeof correo === "string" ? correo : "no-reply@example.com",
      subject: `Nuevo mensaje de ${nombre} ${apellidos}`,
      text: `Correo del cliente: ${correo}\n\nMensaje:\n${mensaje}`,
    });

    await transporter.sendMail({
      from: `"Arquitecture Page" <${GMAIL_USER}>`,
      to: correo,
      subject: "Hemos recibido tu mensaje",
      text: "Gracias por contactarnos, te responderemos pronto.",
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    return new Response(
      JSON.stringify({ error: "No se pudo enviar el mensaje" }),
      {
        status: 500,
      },
    );
  }
};
