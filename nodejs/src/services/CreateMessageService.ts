import prismaClient from "../prisma"
import { io } from "../app";

class CreateMessageService {
    async execute(text: string, author_id: string) {
        const message = await prismaClient.message.create({
            data: {
                text,
                author_id,
            },
            include: {
                author: true,
            },
        });
        
        io.emit("new_message", message);
        
        return message;
    }
}

export { CreateMessageService }