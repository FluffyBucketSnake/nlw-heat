import prismaClient from "../prisma";

class GetLastMessagesService {
    async execute(count: number = 3) {
        const messages = await prismaClient.message.findMany({
            take: 3,
            orderBy: {
                created_at: "desc",
            },
            include: {
                author: true,
            },
        });

        return messages;
    }
}

export { GetLastMessagesService };