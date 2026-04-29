import { faker } from '@faker-js/faker';
import 'dotenv/config'

import connectDB from '../config/database.js';
import PostModel from '../model/postModel.js';
import UserModel from '../model/userModel.js';

await connectDB()



const NUMBER_OF_USERS = 100;
const NUMBER_OF_POSTS = 1000;

const userIDs = []

for (let i = 0; i < NUMBER_OF_USERS; i++) {
    const user = new UserModel({
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        username: faker.internet.username(),
        dateOfBirth: faker.date.birthdate(),
        age: faker.number.int({ min: 18, max: 100 })
    })
    await user.save()
    userIDs.push(user._id)
    console.log(`User ${user.username} with _id: ${user._id} generated!`)
}

for (let i = 0; i < NUMBER_OF_POSTS; i++) {
    const post = new PostModel({
        text: faker.lorem.paragraphs(2),
        title: faker.lorem.sentence(5),
        author: faker.helpers.arrayElement(userIDs)
    })
    await post.save()
    console.log(`Post with _id: ${post._id} generated!`)
}