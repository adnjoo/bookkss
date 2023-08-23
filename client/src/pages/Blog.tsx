import React from 'react';
import MDEditor from '@uiw/react-md-editor';

const post1 = `
### Why Writing Book Reviews is Beneficial

Are you an avid reader? If so, have you ever considered the benefits of sharing your thoughts and experiences through book reviews? In this article, we'll share 4 points about why writing book reviews is good, not only for fellow readers but for your own growth too.

1. Reflecting on Your Reading Experience:

When you take the time to write a book review, you're encouraged to think deeply about the book you've read. This reflection allows you to dissect the plot, and explore the themes in a way that enhances your comprehension and appreciation of the material. As you organize your thoughts, you're more likely to notice subtleties that might have escaped your attention during the initial read.

2. Strengthening Critical Thinking Skills:

Writing book reviews requires you to evaluate various aspects of the story, such as character development, pacing, and more. This process enhances your critical thinking, helping you develop a keen eye for both the strengths and weaknesses of a book.

3. Contributing to the Literary Community:

Book reviews are the lifeblood of the literary world. By sharing your insights, you're contributing to the discourse surrounding literature. Your review might help another reader decide whether a book is worth their time, and your perspective could even shed new light on certain themes or interpretations. 

4. Documenting Your Reading Journey:

Think of book reviews as a personal journal. They serve as a record of your reading journey, showcasing your evolving tastes, interests, and opinions over time. Looking back at your reviews can be an enlightening experience, reminding you of the emotions you had while reading a particular book.

#### Conclusion

In the digital age which connects readers from everywhere, writing book reviews has become a way to engage in meaningful conversations. The benefits of writing book reviews extend far beyond the words you put on the page.
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
