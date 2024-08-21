const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const grades = [
    { grade: "1st Grade" },
    { grade: "2nd Grade" },
    { grade: "3rd Grade" },
  ];

  for (const grade of grades) {
    // Check if the grade already exists
    const existingGrade = await prisma.grade.findUnique({
      where: { grade: grade.grade },
    });

    if (!existingGrade) {
      // Create the grade if it doesn't exist
      await prisma.grade.create({
        data: grade,
      });
    }
  }

  console.log("Grades seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
