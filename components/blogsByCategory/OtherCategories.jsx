import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import slugify from 'slugify';
import { FaAngleDoubleRight } from 'react-icons/fa';

const OtherCategories = ({ categories }) => {
  const [blogs, setBlogs] = useState([]);

  const blogsToShow = [
    {
      id: 1,
      category: categories[0],
      data: blogs
        ?.filter((blog) => blog?.attributes?.category === categories[0])
        .slice(0, 3),
    },
    {
      id: 2,
      category: categories[1],
      data: blogs
        ?.filter((blog) => blog?.attributes?.category === categories[1])
        .slice(0, 3),
    },
    {
      id: 3,
      category: categories[2],
      data: blogs
        ?.filter((blog) => blog?.attributes?.category === categories[2])
        .slice(0, 3),
    },
  ];

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/blogs?filters[$or][0][category][$eqi]=${categories[0]}&filters[$or][1][category][$eqi]=${categories[1]}&filters[$or][2][category][$eqi]=${categories[2]}&populate=*`
    )
      .then((res) => res.json())
      .then((data) => setBlogs(data?.data));
  }, []);

  return (
    <Container className="section">
      <div className="section-center">
        <div className="section-title">
          <h3>
            Other Categories
            <div className="underline-75"></div>
            <div className="underline-100"></div>
            <div className="underline-75"></div>
          </h3>
        </div>

        <div className="blogs-center">
          {blogsToShow?.map((item) => {
            return (
              <article key={item?.id} className="single-category">
                <div className="category-title">
                  <h4>{item?.category}</h4>
                </div>
                <div className="category-blogs">
                  {item?.data?.map((blog) => {
                    return (
                      <Link
                        href={`/${slugify(blog?.attributes.category, {
                          lower: true,
                        })}/${blog?.attributes.slug}`}
                      >
                        <a className="blog">
                          <Image
                            src={blog?.attributes.image?.data?.attributes?.url}
                            alt={blog?.attributes.image?.data?.attributes?.name}
                            width={100}
                            height={100}
                            className="image"
                          />
                          <div className="info">
                            <p>{blog?.attributes.title}</p>
                            <span>
                              read more <FaAngleDoubleRight />
                            </span>
                          </div>
                        </a>
                      </Link>
                    );
                  })}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </Container>
  );
};

export default OtherCategories;

export const Container = styled.section`
  padding-bottom: 0;

  .section-title {
    text-align: center;
    border-top: 1px solid #ececec;
    padding-top: 25px;

    h3 {
      margin: 0 auto;
      display: inline-block;
      div {
        background: var(--clr-orange);
        height: 4px;
        width: 100%;
        margin: 0.5rem auto;

        &:nth-child(1) {
          margin-top: 1.25rem;
        }
      }

      div.underline-75 {
        width: 75%;
      }
    }
  }

  .category-title {
    margin-bottom: 1rem;
  }

  .blogs-center {
    margin-top: 2rem;
    display: grid;
    gap: 1rem;

    @media (min-width: 992px) {
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
    }
  }

  .blog {
    display: grid;
    grid-template-columns: 100px 1fr;
    color: var(--textColor);
    gap: 1rem;
    margin-bottom: 20px;

    .info {
      min-height: 100px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      p {
        color: #404040;
        text-transform: capitalize;
      }

      span {
        color: var(--clr-orange);
      }
    }

    &:hover p {
      color: var(--clr-orange);
    }
  }
`;
