# DogsJourney

## Table of Contents

1. [App Description](#App-Description)
2. [Technologies](#Technologies)
3. [Project Planning](#Project-Planning)
4. [App Functionality](#App-Functionality)
5. [Deployment](#Deployment)
6. [Key Challenges](#Key-Challenges)
7. [Future Developments](#Future-Developments)
8. [References](#References)


## App Description

As someone exploring the possibility of getting a dog, I aim to effortlessly browse through various dog breeds and add potential matches to my wishlist. I'm looking for comprehensive characteristics to help identify the perfect breed that aligns with my lifestyle. Moreover, as a dog owner, I wish to create a personalized profile to cherish and record precious memories while tracking my dog's tricks progress. Additionally, I aim to engage with a thriving community to seek advice and share experiences on a platform where fellow users discuss and solve dog-related problems.

## Technologies
- **FrontEnd**: ReactJS & Material UI
- **BackEnd**: Mongoose, Express, Node.js
- **Database**: MongoDB
- **APIs**: Ninja Dog API, Dog CEO API
- **Others**: JWT for authentication, Cloudinary

## Project Planning
- **WireFrame (MIRO)**: The development process for DogsJourney began with outlining key user stories to define the app's functionality and user experience. To visualize the app's design, we used [Miro](https://miro.com/app/board/uXjVMr7klKo=/) to create our wireframes. Using Miro, I meticulously crafted wireframes that illustrated the app's layout and user interface, providing a comprehensive visual representation of our vision. These wireframes served as the guiding framework, outlining the foundation upon which the app would be built. Additionally, I included Entity Relationship Diagrams (ERDs) to map out the relationships between different data entities within DogsJourney.
These ERDs facilitated a deeper understanding of how user data, Dog Breeds, Dog Profiles, Memories, and other key components would interact, ensuring a smooth and efficient user experience.
<img width="707" alt="image" src="https://github.com/IAmbrose/DogsJourney/assets/139415730/b674e9b6-c2c1-427b-83f1-aa81ed7fa1b5">

![image](https://github.com/IAmbrose/DogsJourney/assets/139415730/70777f3b-9850-4d28-8ff3-865dbd25af3c)


- **Trello Board**: Planning and visualization process laid the groundwork for the DogsJourney app's development. To further ensure that I was on the right track, I utilised the [TrelloBoard](https://trello.com/b/lv2setkG/dogsjourney) to efficiently track the work progress.

## App Functionality 

1. Sign Up & Login as a User:

![image](https://github.com/IAmbrose/DogsJourney/assets/139415730/9414d2fe-08b7-48f9-97a1-b65445d20ae0)

2. Search for a dog breed, and add it to your wishlist. Users can see the characteristics of the dog as well.

![image](https://github.com/IAmbrose/DogsJourney/assets/139415730/942bdd01-7a17-4e72-ade8-ce4b26eaa24a)

3. Add your dog profile and also add your memories with the dog. Complete the dog checklist as you progress.

![image](https://github.com/IAmbrose/DogsJourney/assets/139415730/4557e795-fa9d-4287-85b3-5a15d908b221)

4. See other users dog profiles.

![image](https://github.com/IAmbrose/DogsJourney/assets/139415730/1baf58fe-d514-494e-a8a2-4c752a10a860)

5. By clicking on the other users dog profile, users can few the memories for their dogs.

![image](https://github.com/IAmbrose/DogsJourney/assets/139415730/aeba6a11-1519-4f42-abb1-158c29311ebf)


## Deployment
The app is deployed on Render, and you can access it here.
[DogsJourney](https://dogsjourney.onrender.com)

## Key Challenges
- Intergrating APIs as usual was not easy as I ran into some data problems that could not suit my initial plans.
- Material UI is quite difficult to use as it is very new to me, but with more practice it will get better.
- Cloudinary uploading of image was new for me, I spend alot of time on it.

## Future Developments
- **Community Page**: Implementing a platform where users can interact do share more about their concerns or questions.
- **Comments**: Commenting on users memories.
- **Friend Requests**: Allow users to connect more and add each other as friends.
- **Dog related events**: Find a way to post dog related events so that users are aware.
- **Dog parks and shops**: Create a map for dog parks and shops.

## References
- [Cloudinary Guide](https://cloudinary.com/blog/guest_post/upload-images-to-cloudinary-with-node-js-and-react)
- [Render CORS guide](https://paragon.ba/en/how-to-deploy-a-mern-application-on-render-com/)
