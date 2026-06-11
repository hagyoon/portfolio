---
title: "A List of Different ML Domains"
topic: "Research & ML"
summary: "💡 Disclaimer:"
---

💡 **Disclaimer:  
**I will never be able to include all domains and open challenges. I am not an expert in all of those fields, in fact, rather in none, nor will I probably ever be with the amount of knowledge out there. This list is supposed to be an inspiration to explore the vast amount of different domains in ML and give a feeling for what open challenges there are or could be. Enjoy! 💛

P.S. If you have any suggestions for improving this list, feel free to [email](mailto:boris@borismeinardus.com) or DM me!

---

## Reinforcement Learning

![](https://substackcdn.com/image/fetch/$s_!3sEz!,w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb578b0e9-0353-4344-82b5-3aa639e5ee45_1024x1024.jpeg)

Reinforcement learning is a way to teach computers (agents) how to make good choices through trial and error. It’s like a baby learning how to walk. The baby gets a reward (smiling parents) for each step it takes and learns to move its body to get the biggest reward. 🤖🧠

There are still many challenges but also possibilities with RL!

- **Efficient training**: It’s very sample-inefficient, i.e. the agent takes many random steps that don’t teach it much or even anything.
- **Different areas of application**: RL can be applied to many different problems! Most notably of course robotics, but also Language Modelling ([RLHF](https://huggingface.co/blog/rlhf)), and even [controlling an actual plasma](https://deepmind.google/discover/blog/accelerating-fusion-science-through-learned-plasma-control/) for nuclear fusion!! If there is a simulator, we can apply RL.
	- Robotics includes autonomous driving, controlling an arm, very delicate control of finger movement, and pretty much everything that science fiction has come up with.
- **Different input modalities**: RL can work with a variety of different inputs which all require specific care and research!
	- Audio: imagine an autonomous car on the roads and all a sudden an ambulance activates its sirens. The can can’t see it, so it has to know how to interpret the audio, i.e. what the sound is, where it is coming from, and how to react accordingly.
		- Vision: Tesla is a very big proponent of driverless cars with only vision (instead of lidar sensors). Can an agent process pure vision data to make decisions? Or do we first have to preprocess it through segmentation?
		- Touch& Pressure: imagine hands trying to pick up something delicate.
		- All other sensory data.
- **Developing new science**: People had very polarised views on RL because it was so inefficient at learning. But now more and more people are arguing that RL is necessary for AI agents to develop NEW things. E.g. an LLM can only get so far with discovering new mathematical proofs by learning from our existing knowledge. To go beyond that, LLMs need to explore new domains. That is where RL might play a significant role!

## NLP

![](https://substackcdn.com/image/fetch/$s_!2MiH!,w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc5397c4b-6f2c-45ba-b552-86a053e74c29_1024x1024.jpeg)

Natural Language Processing is a way to teach computers how to understand and talk like humans. It helps computers understand what we write, and then respond in a way that makes sense. It’s like teaching a robot how to talk like us! 🤖🗣️🧠

Open problems:

- **Hallucinations**: This is a very common problem. Large Language Models sometimes tend to *be confidently wrong.* That means they come up with facts that are simply false and “are convinced” that they are true. It currently is still a challenge to teach them to abstain, i.e. admit they don’t know something. (Which is not exactly the same as generally coming up with facts)
- **Reliability**: Similar to hallucinations, reliability often refers to the model not being so sensitive to the input, i.e. for similar inputs the response/ output should still be the same/ equally similar.
- **Interpretability**: LLMs are still huge Black Boxes. Understanding how and why they work will help improve their performance, make them safer from adversarial attacks, and perhaps even shed light on how similar they are to our own brains.  
	An interesting [recent work](https://transformer-circuits.pub/2024/scaling-monosemanticity/index.html) in that area was published by Anthropic!
- **Efficiency**: Traditional Transformer-based LLMs scale quadratically with the input length. There have already been amazing developments in making Transformers more and more efficient, but there is always room for improvement!
- **NLP for Low-Resource Scenarios**: This is a simple but challenging problem. Current LLMs work very well on resource-rich languages, e.g. English, i.e. languages with a lot of text on the internet. But languages that are rarer, are less present in the training data of LLMs and thus those LLMs perform poorly on respective benchmarks.
- **Evaluation**: Speaking of evaluation, the current benchmarks that LLMs are tested on are pretty much all flawed. Even one of the most respected ones, MMLU, has a lot of nonsensical questions and answers. Not only are the benchmarks themselves not the best, but the metrics are also not the best. Imagine you are trying to evaluate an LLM on question-answering tasks. The LLM might give the right answer, but it is not **exactly** the same as the ground truth label. Then the score might be lower (or higher) than it actually should be.

## Computer Vision

![](https://substackcdn.com/image/fetch/$s_!8jDP!,w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F76307ba2-8ce8-4e75-a7f4-94c8191c2137_1024x1024.jpeg)

Computer Vision is the field of teaching computers to see the world. We want computers to recognize objects and tell them apart. We want them to be able to interact with the world based on what they see and what we want them to do. One of the biggest challenges is performing CV reliably and efficiently. A driving car should always be able to recognize a stop sign, no matter whether it is day or night, sunny or raining, or whether the sign is slightly tilted or not.

- **Object detection**: You might think this is a solved problem. Just apply YOLO and we are good. But this is far from true. Depending on the benchmark current object detection models still struggle. This is especially true for out-of-distribution examples, i.e. examples that the model was never trained on. Furthermore, it is annoying to always have a fixed set of classes to detect. Once we want to add one more, we have to retrain the whole model! There is still much to do!
- **Semantic** **Segmentation**: Semantic segmentation is the task of detecting different objects in an image by exactly outlining their shape. This is very challenging, especially because we here need a lot of expensive annotations. Developing techniques to make models more efficient, learning how to train these models with less and less expensive labels, or even creating reliable synthetic data are interesting areas to explore!
- **Video processing**: Now imagine all tasks that are performed on images, but now on video. The sheer increase in compute is a huge challenge. You might want to develop new methods that make use of the consistency present in videos. E.g. Object tracking is the task of detecting and tracking an object in a video.
- **Depth estimation**: This one is very overlooked although it is one of the most important areas for VR and AR! If you want to be able to have objects interact with your surroundings, they have to know the 3D structure of these surroundings potentially only by having a 2D video stream!
- **Point cloud generation**: There is a lot of work happening in 3D computer vision. Everything that has to do with AR and VR works in 3D space and often leverages something called point clouds. Exploring this direction has a lot of potential implications!

## Audio Processing

![](https://substackcdn.com/image/fetch/$s_!H4N1!,w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa5f35842-3fc9-4fcf-9487-c246b13a516e_1024x1024.jpeg)

Audio processing deals with teaching a model how to handle audio data. This includes having audio as an input, but also audio as an output! What is most interesting, in my opinion, is how to develop techniques that go from audio to audio without parsing the input audio to text (as an intermediate step) and then based on the text generate audio. This might be particularly useful for voice assistants!

- **Audio Classification**: This task speaks for itself. You want to classify sounds. Nothing too crazy, but depending on the data you have at hand, can definitely pose a challenge.
- **Automatic speech recognition**: ASR uses ML to process human speech into readable text.
- **Audio generation**: Imagine you could write out a text prompt that describes the music you would like to generate! This is already possible (to some extent). Current models perform well, but we can definitely still tell that the music was AI-generated. Also, the models can only generate up to 30, 60, or 120 seconds. Audio generation can also mean generating voice from text! That field is also quite promising, but also dangerous! As with image generation (see multimodal learning), we want to also develop techniques to watermark AI-generated voices or even music.
- **Real-time translation**: Up until now, most tasks involve audio to text. But what if we want to directly process a voice as input and output another voice? Do we need to first parse the speech into text and then generate the speech in a new voice based on the text? What about directly going from audio to audio, without the intermediate step of text? Think of the magical devices where you can speak into a microphone and the model can directly output what you said, in another language, in real time as far as the language allows it due to its grammar.

## Multimodal Learning

![](https://substackcdn.com/image/fetch/$s_!qRuY!,w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F05522118-a18b-44e3-85c8-4f7fd22a15f0_1024x1024.jpeg)

Multimodal learning just means teaching a model to understand multiple modalities (text, image, video, audio, depth, different sensor data, etc.) and solve tasks accordingly. Most research focuses on two modalities but there is already progress in teaching models to handle even more modalities. But everything should be tackled step-by-step!

- **Text to Image generation**: Although this field is rapidly evolving are we are almost at the point of not being able to differentiate a generated image from a real one, we not quite there yet. Also, a challenge that comes with this problem, is exactly that, not being able to tell what image is real and what is fake. Furthermore, it might be interesting to have different ways of conditioning the generation process. E.g. sketching something and generating it following a further prompt.
- **Recognizing generated data**: As mentioned, we are arriving at the point of being able to generate an image of a famous person doing something he or she has actually never done before. That is a problem that needs to be tackled!
- **More multimodal generation**: You already know the deal, I don’t think I need to elaborate more. Text to video, text to audio, audio to video, depth map to image. Get creative:)
- **Image to text**: Hereby I mean a variety of different image-to-text tasks such as image captioning, image question answering, image instruction following, chatting about an image, and sophisticated few-shot learning. All of these tasks are still open to be properly solved. And once again, once you go to resource-poor languages, the performance of pretty much any large existing model takes a big hit. So that is always an option for research and development.
- **Video to text**: Same as image to text, but even more challenging, simply because it is completely unfeasible to process an entire 2-minute, 30-minute, 120-minute video and prompt an LLM to answer a question. At least for now. On top of that, there are tasks like video summarisation, chaptering, or (dense) captioning.
- **Moment retrieval in videos:** You have a video or even a movie and now want to retrieve a moment given a text query. E.g. you have a 2h long recording of your summer vacation and want to find the moments where you were swimming in the pool.
- **Cross-modal retrieval**: Imagine you have a database of images and want to retrieve certain ones given a text query. Now you can take that further and imagine any type of modality as query input and output.

## Graph Neural Networks

![](https://substackcdn.com/image/fetch/$s_!a7yu!,w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F498ef61c-7e46-4314-b636-c7aaa9384bc2_1024x1024.jpeg)

Graph Neural Networks (GNNs) are a type of deep learning model that can learn from graph-structured data, such as social networks, molecular structures, or traffic networks. GNNs have shown great potential for various tasks, such as node classification, link prediction, graph generation, and graph reasoning.

- **Scaling of GNNs**: [How to design efficient and scalable GNNs that can handle large-scale and dynamic graphs](https://arxiv.org/abs/2108.10733)? I recommend reading the linked paper, there you can learn much more than I can possibly cover here.
- **Generalization**: How to improve the expressive power and generalization ability of GNNs for complex graph problems. For now, GNNs are always applied to one specific task and domain. Their generalization to new domains and tasks is still very under-explored!
- **GNNs + X**: How to combine GNNs with other deep learning models, such as convolutional neural networks, recurrent neural networks, or [reinforcement learning](https://ieeexplore.ieee.org/document/10161704?denied=)? Many GNNs are applied to static structures that don’t change over time. But traffic networks for example change every second, so we would ideally want a GNN that can handle data that changes over time while considering the past to predict the future.

## Applied AI

![](https://substackcdn.com/image/fetch/$s_!D7sj!,w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2a1b177c-8dc0-4802-a9c6-38265efc8469_1024x1024.jpeg)

This domain of AI focuses more on applying existing frameworks to real-world data. The problems you will be solving will mostly include data engineering, data analysis, and making it reliable. The latter is the most challenging differentiator between academic ML research, where it is okay to have a 90% accuracy, but when you have an autonomous car, you really want 99.99%. Those last few percentage points are often the most difficult!

- **Chatbots in industry**: Imagine you don’t have to wait for 30 minutes on the phone to get through to your doctor to make an appointment or ask for another prescription… Imagine you could just have a call, or write with an AI assistant that has access to the patient database and can handle that with you. No more waiting. The same can be applied to literally everything that has something like customer service. Lawyers can have a legal assistant to help them speed up their work. LLMs for education (personal tutors), finance, engineering, science… Just be creative here.
- **CV in Industry**: The easiest example is to think of the possibilities of CV in medicine. How much cheaper and faster do you think a treatment could be if you don’t need a radiologist who looks at dozens of images per patient? CV can be used in agriculture to automate harvesting, reducing labor costs and thus making produce cheaper. Again, creativity is the limit.
- **GNNs in industry**: Everything that can be represented as a graph needs specific treatment. E.g. the street network is a graph, think of AI for routing, better ETA estimation, estimating traffic flow, and predicting traffic congestion. Molecules are graphs; Predicting the toxicity of a molecule, predicting its physical properties, and predicting its effectiveness or properties when reacting with a different molecule. All of that is important in all the stages of drug development.

## Evolutionary Learning

![](https://substackcdn.com/image/fetch/$s_!4xn5!,w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8bdd4c19-472d-48c4-8c27-7f1138352228_1024x1024.jpeg)

Evolutionary learning is a type of machine learning that uses evolutionary algorithms to optimize the parameters, structure, or behavior of learning models. Who said gradient descent is the only and right way to learn? Evolutionary algorithms are inspired by natural evolution and use mechanisms such as selection, mutation, crossover, and reproduction. [Evolutionary learning can be applied to various machine learning tasks, such as neural networks, reinforcement learning, clustering, and ensemble methods](https://dl.acm.org/doi/fullHtml/10.1145/3467477).

I would love to elaborate more on the open challenges, but I am too unfamiliar with the topic. I recommend reading the article I reference and doing further research.

## Meta Learning

![](https://substackcdn.com/image/fetch/$s_!13zw!,w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F266113b3-1fff-428f-86c2-bd8893faf7c5_1024x1024.jpeg)

[Meta learning](https://arxiv.org/abs/2004.05439) is a type of machine learning that learns how to learn. It can use the output or the experience of other machine learning models to improve its own performance. Meta learning can be used for tasks like ensemble learning, model selection, algorithm tuning, and multi-task learning.

The same applies to Meta Learning. I am far from familiar with the topic. The reference above is an article that I can recommend reading!
