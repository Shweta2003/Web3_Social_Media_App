import React from 'react';
import classes from './About.module.css';
import our_logo from '../../Assets/our_logo.png'
import post_placeholder from '../../Assets/post_placeholder.png'
import ether from '../../Assets/ether.png'

const About = () => {
    return (
        <div className={classes.container}>
            <div className={classes.content}>
                <div className={classes.text}>
                    <div className={classes.heading}>
                        <h1>Welcome to EduBadge!</h1>
                        <h4>Your Ultimate Student Collectibles Experience</h4>
                    </div>
                    <div className={classes.image_container}>
                        <div>
                            <img src={post_placeholder} alt="post" className={classes.image} />
                        </div>
                        <div>
                            <p> At EduBadge, we're all about celebrating your journey as a student, and what better way to do that than through a captivating collection of badges, achievements, and scorecards? We've created a one-of-a-kind decentralized application (DAPP) that brings your academic and extracurricular accomplishments to life in a whole new digital dimension.</p>
                        </div>
                    </div>

                    <div className={classes.heading}>
                        <h2>Why EduBadge?</h2>

                        <div className={classes.image_container}>
                            <div>
                                <h3>Personalized Collections</h3>
                                <p>Create personalized collections that narrate your unique story. Showcase your growth, milestones, and passions in an interactive and captivating manner.</p>
                                <h3>Blockchain Technology</h3>
                                <p>Built on cutting-edge blockchain technology, EduBadge ensures the security, authenticity, and immutability of your collectibles. Each item in your collection is verifiable and cannot be tampered with.</p>
                                <h3>Engaging Experience</h3>
                                <p>The EduBadge interface is designed to be intuitive and visually appealing, making the process of curating and exploring collectibles a delightful experience.</p>
                                <h3> Sharing and Socializing</h3>
                                <p>Share your achievements with peers, mentors, and prospective employers effortlessly. Connect with like-minded individuals and build a network around your interests.</p>
                            </div>

                            <div>
                                <img src={ether} alt="ether" className={classes.image} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
