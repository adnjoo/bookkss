import React from 'react';
import MDEditor from '@uiw/react-md-editor';

const post1 = `
### Unlocking the Power of Expression: Why Writing Book Reviews is Incredibly Beneficial

Intro:
Are you an avid reader who loves to immerse yourself in the world of books? If so, have you ever considered the immense benefits of sharing your thoughts and experiences through book reviews? Writing book reviews isn't just about summarizing a plot or sharing your opinion on a story; it's a powerful tool that enriches your reading journey and contributes to the literary community in more ways than you might imagine. In this article, we'll delve into why writing book reviews is good, not only for fellow readers but for your own growth and understanding as well.

Reflecting on Your Reading Experience:
When you take the time to write a book review, you're encouraged to think deeply about the book you've read. This reflection allows you to dissect the plot, analyze the characters, and explore the themes in a way that enhances your comprehension and appreciation of the material. As you organize your thoughts, you're more likely to notice subtleties and nuances that might have escaped your attention during the initial read.

Strengthening Critical Thinking Skills:
Crafting a book review requires you to evaluate and critique various aspects of the story, such as character development, pacing, writing style, and more. This process enhances your critical thinking skills, helping you develop a keen eye for both the strengths and weaknesses of a book. As a result, your ability to assess and articulate your opinions in a thoughtful manner is honed, which can be a valuable skill in various aspects of life.

Contributing to the Literary Community:
Book reviews are the lifeblood of the literary world. By sharing your insights, you're contributing to a dynamic discourse surrounding literature. Your review might help another reader decide whether a book is worth their time, and your perspective could even shed new light on certain themes or interpretations. Your contribution, no matter how small, becomes a part of the broader conversation about books.

Supporting Authors and Publishers:
When you write a positive review for a book you enjoyed, you're not only acknowledging the author's hard work but also encouraging others to explore their work. Your review could influence potential readers to pick up the book, which in turn supports both the author and the publishing industry. Moreover, constructive criticism in reviews can provide authors with valuable feedback to refine their craft.

Documenting Your Reading Journey:
Think of book reviews as a personal literary journal. They serve as a record of your reading journey, showcasing your evolving tastes, interests, and opinions over time. Looking back at your reviews can be a nostalgic and enlightening experience, reminding you of the emotions and thoughts you had while reading a particular book.

Conclusion:
In a world where the digital age has connected readers from all corners of the globe, writing book reviews has become a way to engage in meaningful conversations and share your passion for literature. From refining your critical thinking skills to contributing to the literary landscape, the benefits of writing book reviews extend far beyond the words you put on the page. So, the next time you finish a captivating novel, consider putting pen to paper (or fingers to keyboard) and sharing your thoughts with the world. Your review could be the spark that ignites someone else's literary journey."
`;

export const Blog: React.FC = () => {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center p-4'>
      <h1 className='mb-6 text-3xl font-semibold'>Bookkss Blog</h1>
      <div className='mx-8 grid grid-cols-1 gap-4 sm:mx-16 md:mx-48 lg:mx-64'>
        <div className='mx-auto flex flex-row justify-center'>
          {[post1].map((post: any, index: number) => (
            <MDEditor.Markdown
              key={index}
              source={post}
              wrapperElement={{ 'data-color-mode': 'light' } as any}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
