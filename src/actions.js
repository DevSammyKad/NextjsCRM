"use server";

import prisma from "./lib/db";
import { parseWithZod } from "@conform-to/zod";
import { leadSchema } from "@/lib/zodSchemas";
import { redirect } from "next/navigation";

const organizationId = "631f1013-e762-4ff5-82d7-1ad58cc8da6d";
// getLeads(organizationId).then((result) => console.log(result));

export async function getLeads() {
  try {
    const leads = await prisma.lead.findMany({
      // where: {
      //   organizationId: organizationId,
      // },
    });
    return { data: leads };
  } catch (error) {
    console.error("Error fetching leads:", error);
    return { error: "Failed to load leads" };
  }
}

// Example usage:

export async function createLead(formData) {
  console.log("Received FormData:", Object.fromEntries(formData.entries()));
  const submission = parseWithZod(formData, {
    schema: leadSchema,
  });

  if (submission.status !== "success") {
    return submission.reply(); // Ensure the errors are returned or logged
  }

  try {
    const lead = await prisma.lead.create({
      data: {
        name: submission.value.name,
        age: submission.value.age,
        email: submission.value.email,
        phone: submission.value.phone,
        source: submission.value.source,
        status: submission.value.status,
        note: submission.value.note,
      },
    });

    console.log("Lead Created:", lead);
    // Uncomment this once you test the function
    // redirect("/dashboard/leads");
  } catch (error) {
    console.error("Error creating lead:", error);
  }
}
