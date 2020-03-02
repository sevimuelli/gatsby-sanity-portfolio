import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import sr from '@utils/sr';
import { srConfig, github } from '@config';
import styled, { keyframes } from 'styled-components';
import { theme, mixins, media, Section, Heading } from '@styles';
const { colors, fontSizes, fonts } = theme;

import BlockContent from '../block-content';
import { getFluidGatsbyImage } from 'gatsby-source-sanity';
import clientConfig from '../../../client-config';
import { buildImageObj } from '../../lib/helpers';
import { imageUrlFor } from '../../lib/image-url';

const StyledContainer = styled(Section)`
  position: relative;
`;
const StyledFlexContainer = styled.div`
  ${mixins.flexBetween};
  align-items: flex-start;
  ${media.tablet`display: block;`};
`;
const StyledContent = styled.div`
  width: 60%;
  max-width: 480px;
  ${media.tablet`width: 100%;`};
  a {
    ${mixins.inlineLink};
  }
`;
const SkillsContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, minmax(140px, 200px));
  overflow: hidden;
  padding: 0;
  margin: 20px 0 0 0;
  list-style: none;
`;
const Skill = styled.li`
  position: relative;
  margin-bottom: 10px;
  padding-left: 20px;
  font-family: ${fonts.SFMono};
  font-size: ${fontSizes.smish};
  color: ${colors.slate};
  &:before {
    content: '▹';
    position: absolute;
    left: 0;
    color: ${colors.green};
    font-size: ${fontSizes.sm};
    line-height: 12px;
  }
`;
const StyledPic = styled.div`
  position: relative;
  width: 40%;
  max-width: 300px;
  margin-left: 60px;
  ${media.tablet`margin: 60px auto 0;`};
  ${media.phablet`width: 70%;`};
  a {
    &:focus {
      outline: 0;
    }
  }
`;
const StyledAvatar = styled(Img)`
  position: relative;
  mix-blend-mode: multiply;
  filter: grayscale(100%) contrast(1);
  border-radius: ${theme.borderRadius};
  transition: ${theme.transition};
`;
const StyledAvatarLink = styled.a`
  ${mixins.boxShadow};
  width: 100%;
  position: relative;
  border-radius: ${theme.borderRadius};
  background-color: ${colors.green};
  margin-left: -20px;
  &:hover,
  &:focus {
    background: transparent;
    &:after {
      top: 15px;
      left: 15px;
    }
    ${StyledAvatar} {
      filter: none;
      mix-blend-mode: normal;
    }
  }
  &:before,
  &:after {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: ${theme.borderRadius};
    transition: ${theme.transition};
  }
  &:before {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${colors.navy};
    mix-blend-mode: screen;
  }
  &:after {
    border: 2px solid ${colors.green};
    top: 20px;
    left: 20px;
    z-index: -1;
  }
`;

const StyledGridContainer = styled.div`
  display: grid;
  grid-template: 1fr / 1fr 1fr;
  grid-gap: 3rem;
  margin: 4rem 5%;
  ${media.desktop`
    grid-gap: 3rem 1.5rem;
    margin: 80px 10px;
  `};
  ${media.tablet`
    grid-template: 1fr / 1fr;
    grid-gap: 3.5rem;
    margin: 80px 30px;
  `};
`;

const SkillBigContainer = styled.div`
  display: flex;
  align-items: center;
  ${'' /* height: 200px; */}
  ${'' /* justify-content: space-between; */}
`;

const SkillBigPictureContainter = styled.div`
  ${'' /* align-self: center; */}
  width: 11%;
  justify-self: start;
`;

const SkillBigPicture = styled.img`
  ${'' /* display: block;
  height: 50px;
  box-sizing: border-box;
  object-fit: contain; */}
  max-width: 100%;
  height: auto;
  vertical-align: middle;
  width: 100%;
`;

const SkillBigDetail = styled.div`
  ${'' /* width: 80%; */}
  flex-grow: 1;
  justify-self: stretch;
  display: flex;
  flex-direction: column;
  margin-left: 1.2rem;
`;

const SkillBigMeta = styled.div`
  margin-bottom: 0.8rem;
  display: flex;
  justify-content: space-between;
`;

const SkillBigTitle = styled.h3`
  line-height: 1;
  margin-bottom: 0;
`;

const SkillBigProcent = styled.h3`
  line-height: 1;
  margin-bottom: 0;
`;

const SkillBigBar = styled.div`
  width: 100%;
  height: 1rem;
  background: ${colors.navy};
  position: relative;
  border-radius: 10px;

  ${'' /* &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    border-radius: 10px;
    width: 80%;
    background-image: linear-gradient(to right, ${colors.navy}, ${colors.green});
    animation-duration: 1.5s;
    animation-timing-function: ease;
    animation-delay: 0s;
    animation-iteration-count: 1;
    animation-direction: normal;
    animation-fill-mode: forwards;
    animation-play-state: running;
    animation-name: ratio90;
  } */}
`;

const SkillBigBarIntern = styled.div`
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  border-radius: 10px;
  ${'' /* width: 80%; */}
  background-image: linear-gradient(to right, ${colors.navy}, ${colors.green});
  ${'' /* animation-duration: 1.5s;
  animation-timing-function: ease;
  animation-delay: 0s;
  animation-iteration-count: 1;
  animation-direction: normal;
  animation-fill-mode: forwards;
  animation-play-state: running; */}
  ${'' /* animation-name: ratio; */}

  ${mixins.barAnimations}
`;

const About = ({ data }) => {
  const { skills, otherSkills, title, _rawDescription, photo } = data[0].node;
  console.log(photo);
  // const fluidProps = getFluidGatsbyImage(photo.asset._id, clientConfig.sanity);
  // const { title, skills, avatar } = frontmatter;
  const revealContainer = useRef(null);
  useEffect(() => sr.reveal(revealContainer.current, srConfig()), []);



  return (
    <StyledContainer id="about" ref={revealContainer}>
      <Heading>{title}</Heading>
      <StyledFlexContainer>
        <StyledContent>
          {_rawDescription && <BlockContent blocks={_rawDescription || []} />}
          <SkillsContainer>
            {otherSkills && otherSkills.map((skill, i) => <Skill key={i}>{skill}</Skill>)}
          </SkillsContainer>
        </StyledContent>
        <StyledPic>
          <StyledAvatarLink href={github}>
            <StyledAvatar fluid={photo.asset.fluid} alt="photo.alt" />
          </StyledAvatarLink>
        </StyledPic>
      </StyledFlexContainer>
      <StyledGridContainer>
        {skills &&
          skills.map((skill, i) => {
            const barLength = {
              animation: `ratio${skill.level}0 3s forwards`
            };
            return (
              <SkillBigContainer>
                <SkillBigPictureContainter>
                  <SkillBigPicture
                    src={imageUrlFor(buildImageObj(skill.icon))
                      .height(200)
                      // .width(200)
                      // .fit('min')
                      .url()}
                    alt={skill.title}
                  />
                </SkillBigPictureContainter>
                <SkillBigDetail>
                  <SkillBigMeta>
                    <SkillBigTitle>{skill.title}</SkillBigTitle>
                    <SkillBigProcent>{`${skill.level}0%`}</SkillBigProcent>
                  </SkillBigMeta>
                  <SkillBigBar>
                    <SkillBigBarIntern style={barLength}/>
                  </SkillBigBar>
                </SkillBigDetail>
              </SkillBigContainer>
            );
          })}
      </StyledGridContainer>
    </StyledContainer>
  );
};

About.propTypes = {
  data: PropTypes.array.isRequired
};

export default About;