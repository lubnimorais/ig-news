import { render, screen } from "@testing-library/react";
import { mocked } from "jest-mock";
import { getPrismicClient } from '../../services/prismic'

import Post, { getStaticProps } from "../../pages/posts";


jest.mock('../../services/prismic');


const posts = [{
  slug: 'my-new-post',
  title: 'My new post',
  excerpt: 'Post excerpt',
  updatedAt: '10 de abril',
}]

describe("Posts page", () => {
  it('renders correctly', () => {
    render(<Post posts={posts} />);

    expect(screen.getByText('My new post')).toBeInTheDocument();
  });

  it('loads initial data', async () => {
    const getPrismicClientMocked = mocked(getPrismicClient);

    getPrismicClientMocked.mockReturnValueOnce({
      query: jest.fn().mockResolvedValueOnce({
        results: [
          {
            uid: 'my-new-post',
            data: {
              title: [
                { type: 'heading', text: 'My new post' }
              ],
              content: [
                { type: 'paragraph', text: 'Post excerpt' }
              ],
            },
            last_publication_date: '04-01-2021',
          }
        ]
      })
    } as any);

    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [
            {
              slug: 'my-new-post',
              title: 'My new post',
              excerpt: 'Post excerpt',
              updatedAt: '01 de abril de 2021',
            }
          ]
        }
      })
    );
  });
})