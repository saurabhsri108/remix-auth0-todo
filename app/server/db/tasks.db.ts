import prisma from '../prisma/client';

interface ITaskItem {
    id?: number,
    description: string,
    completed: boolean,
    date: Date;
}

export const getTasks = async () => {
    return await prisma.task.findMany();
};

export const createTask = async (task: ITaskItem) => {
    return await prisma.task.create({
        data: {
            id: task.id,
            description: task.description,
            completed: task.completed,
            date: task.date
        }
    });
};

export const deleteTask = async (id: ITaskItem["id"]) => {
    return await prisma.task.delete({ where: { id } });
};

export const doneTask = async (id: ITaskItem["id"]) => {
    const task = await prisma.task.findFirst({ where: { id } });
    return await prisma.task.update({ data: { completed: !task?.completed }, where: { id } });
};