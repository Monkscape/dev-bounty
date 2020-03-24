import { BountyObject } from "./types";

export const data: BountyObject[] = [
    {
        id: 1,
        user: 'nmille2',
        description: 'Anyone have any experience in simulating a redis cache for test case suites?  Any useful frameworks?',
        title: 'Setup Redis Cache for Local Testing',
        upvotes: 6,
        answer: 'Hey Noah, my team ran into a similar struggle in the past.  We found out wrapping tests in transactions allowed us to similate the cache.',
        answeredBy: 'jkumar2',
        status: 'COMPLETE'
    },
    {
        id: 2,
        user: 'jkumar2',
        description: "JUnit5 has some great new features that would greatly speed up the writing of our unit tests, but I'm not sure what the best approach is to onboard it.",
        title: 'Migrating from JUnit4 to JUnit5',
        upvotes: 5,
        answer: 'JUnit5 is awesome!  And the great part is that you actually can have it co-exist with JUnit4 tests!  Just supply the JUnit vintage and jupiter engines and gradle will do the rest.',
        answeredBy: 'nmille2',
        status: 'COMPLETE'
    },
    {
        id: 3,
        user: 'jdude',
        description: "Hey All!  Like other teams, we need to upgrade our java version.  Any success stories out there?",
        title: 'Preparing to upgrade to Java 11',
        upvotes: 2,
        answer: "Hey Java dude.  We've been working with Java 11 for a little over a month now.  We documented our migration story at the java11_api repo, check it out!",
        answeredBy: 'jelev11',
        status: 'COMPLETE'
    },
    {
        id: 4,
        user: 'nmille2',
        description: 'With the release of OpenJDK14 and Java 14 last friday.  What new features do you think could enhance our pre-existing codebases in the future?',
        title: 'New Features in OpenJDK14',
        upvotes: 6,
        status: 'REQUESTED'
    },
    {
        id: 5,
        user: 'gdude',
        description: "My local setup for digital seems to keep breaking.  Does anyone have ideas as to how we can continue to improve our local setups for Digital applications?",
        title: 'Digital Local Setup',
        upvotes: 4,
        status: 'REQUESTED'
    }
];