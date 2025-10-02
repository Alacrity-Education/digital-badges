import { Badge } from "../../db/schema";
import { Recipient } from "../../db/schema";
import { BadgeAssertion } from "../../db/schema";
import { Issuer } from "../../db/schema";

interface EmailTemplateProps {
  recipient: Recipient;
  badge: Badge;
  badgeAssertion: BadgeAssertion;
  issuer: Issuer;
}

import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmailToAwardee = async (props: EmailTemplateProps) => {
  //extract domain from issuer url
  const url = new URL(props.issuer.url);
  const domain = url.hostname;
  const { data, error } = await resend.emails.send({
    from: `Badge Engine <badges@${domain}>`,
    to: [props.recipient.identity],
    subject: "Badge Devlivery!",
    react: EmailTemplate(props),
  });
  if (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email.");
  }
  console.log("Email sent successfully:", data);
  return data;
};

export function EmailTemplate({
  recipient,
  badge,
  badgeAssertion,
  issuer,
}: EmailTemplateProps) {
  return (
    <div>
      <h1>Hi, {recipient.name}!</h1>
      <p>
        Congratulations! You have been awarded the {badge.name} badge by{" "}
        <a href={issuer.url}>{issuer.name}</a>
      </p>
      <p>
        You can view your badge at this url:{" "}
        {`${issuer.engineUrl}/assertions/${badgeAssertion.uid}`}
      </p>
    </div>
  );
}
