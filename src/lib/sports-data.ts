
export type RoadmapStage = {
  stageName: string;
  duration: string;
  description: string;
  resources: { title: string; url: string }[];
};

export type Roadmap = {
  stages: RoadmapStage[];
};

export type RoadmapKey = `${string}_${string}_${string}`; // ageGroup_fitnessLevel_budget

export type Sport = {
  id: string;
  name: string;
  history: string;
  rules: { title: string; content: string }[];
  keyTerms: { term: string; definition: string }[];
  photoGallery: { imageUrl: string; caption: string; hint: string }[];
  roadmaps?: Record<RoadmapKey, Roadmap>;
};

const tennisRoadmaps: Record<RoadmapKey, Roadmap> = {
  "15-25_Beginner_Low": {
    stages: [
      {
        stageName: "Beginner Basics",
        duration: "3 months",
        description: "Focus on learning the fundamental strokes (forehand, backhand, volley, serve), basic footwork, and understanding the rules and scoring of the game.",
        resources: [
          { title: "Tennis Basics for Beginners", url: "https://www.youtube.com/watch?v=1oQh6S_h4aQ" },
          { title: "Find a Public Tennis Court Near You", url: "https://www.usta.com/en/home/play/tennis-courts.html" },
        ],
      },
      {
        stageName: "Intermediate Development",
        duration: "6 months",
        description: "Work on consistency, adding spin to your shots, improving serve placement, and developing basic match strategies. Play regularly with different partners.",
        resources: [
          { title: "How to Add Topspin to Your Forehand", url: "https://www.youtube.com/watch?v=18a-4-BP3v4" },
        ],
      },
      {
        stageName: "Advanced Competitor",
        duration: "12+ months",
        description: "Refine advanced techniques, develop a strong mental game, and start competing in local leagues or tournaments to gain match experience.",
        resources: [
          { title: "Join a USTA League", url: "https://www.usta.com/en/home/play/leagues.html" },
        ],
      },
    ],
  },
   "26-40_Intermediate_Medium": {
    stages: [
      {
        stageName: "Refining Skills",
        duration: "4 months",
        description: "You have the basics down. Now focus on shot consistency, improving your serve's power and accuracy, and developing a reliable second serve. Consider joining a weekly clinic.",
        resources: [
          { title: "Advanced Serving Techniques", url: "https://www.youtube.com/watch?v=j_pT_h1tE1E" },
           { title: "Tennis Drills for Intermediate Players", url: "https://www.youtube.com/watch?v=6hN426g_TOQ" },
        ],
      },
      {
        stageName: "Competitive Play",
        duration: "8 months",
        description: "Start playing in local leagues or club tournaments. Work with a coach occasionally to analyze your game and identify weaknesses. Focus on strategy and point construction.",
        resources: [
          { title: "How to Play Smarter Tennis", url: "https://www.youtube.com/watch?v=gS-p9E5-D-E" }
        ],
      },
      {
        stageName: "Peak Performance",
        duration: "12+ months",
        description: "Focus on maintaining physical fitness, preventing injuries, and developing advanced strategies based on your opponent's style. Compete regularly to stay sharp.",
        resources: [
           { title: "Tennis Fitness and Footwork Drills", url: "https://www.youtube.com/watch?v=F2H0i0iN_wY" }
        ],
      },
    ],
  }
};


export const sportsData: Sport[] = [
  {
    id: "tennis",
    name: "Tennis",
    history: "The modern game of tennis originated in Birmingham, England, in the late 19th century as 'lawn tennis'. It had close connections both to various field ('jousting') games such as croquet and bowls as well as to the older racket sport of real tennis.",
    rules: [
      { title: "Scoring", content: "Points are awarded in scores of 15, 30, and 40. 40-40 is called deuce. A player must win by two clear points." },
      { title: "Serving", content: "The server must stand behind the baseline. The ball must be hit before it bounces and land in the diagonally opposite service box." },
      { title: "Faults", content: "A fault is a serve that does not land in the proper service box. Two consecutive faults result in a double fault, and the server loses the point." },
    ],
    keyTerms: [
      { term: "Ace", definition: "A serve that is not touched by the opponent." },
      { term: "Deuce", definition: "A score of 40-40." },
      { term: "Ad Court", definition: "The left side of the court, where the 'advantage' point is played." },
    ],
    photoGallery: [
        { imageUrl: "https://placehold.co/600x400.png", caption: "A powerful forehand winner.", hint: "tennis forehand" },
        { imageUrl: "https://placehold.co/600x400.png", caption: "A focused player prepares to return a serve.", hint: "tennis return" },
        { imageUrl: "https://placehold.co/600x400.png", caption: "Celebrating a match point on a grass court.", hint: "tennis celebration" },
    ],
    roadmaps: tennisRoadmaps
  },
  {
    id: "basketball",
    name: "Basketball",
    history: "Invented in December 1891 by Canadian physical education instructor James Naismith as a less injury-prone sport than football. The game was established fairly quickly, becoming very popular as the 20th century progressed, first in America and then in other parts of the world.",
    rules: [
      { title: "Game Play", content: "The game is played between two teams of five players each. The objective is to shoot a ball through a hoop 18 inches (46 cm) in diameter and 10 feet (3.048 m) high." },
      { title: "Violations", content: "Common violations include traveling (taking more than one step without dribbling), double dribble, and goaltending." },
      { title: "Fouls", content: "Personal fouls pertain to illegal physical contact with an opponent. Technical fouls are for unsportsmanlike conduct." },
    ],
    keyTerms: [
      { term: "Dribble", definition: "Bouncing the ball on the floor with one hand." },
      { term: "Slam Dunk", definition: "A shot where a player forces the ball through the basket with one or both hands." },
      { term: "Alley-oop", definition: "A play where one player throws the ball near the basket to a teammate who jumps, catches the ball in mid-air and scores." },
    ],
    photoGallery: [
      { imageUrl: "https://placehold.co/600x400.png", caption: "A player mid-air during a slam dunk.", hint: "basketball dunk" },
      { imageUrl: "https://placehold.co/600x400.png", caption: "A tense moment at the free-throw line.", hint: "basketball freethrow" },
      { imageUrl: "https://placehold.co/600x400.png", caption: "Detailed view of a basketball court.", hint: "basketball court" },
    ],
  },
  {
    id: "badminton",
    name: "Badminton",
    history: "The game is named for Badminton House, the country estate of the Duke of Beaufort in Gloucestershire, England, where it was first played in about 1873. The roots of the sport can be traced to ancient Greece, China, and India.",
    rules: [
      { title: "Scoring", content: "A match consists of the best of 3 games of 21 points. The side winning a rally adds a point to its score." },
      { title: "Serving", content: "The serve must be hit underarm and below the server's waist. The shuttlecock must travel diagonally to the opponent's service court." },
      { title: "Lets", content: "A 'let' is called when there is an unforeseen or accidental hindrance. The rally is stopped and replayed with no change to the score." },
    ],
    keyTerms: [
      { term: "Shuttlecock", definition: "The projectile used in badminton, also known as a shuttle or birdie." },
      { term: "Smash", definition: "A powerful overhead shot hit steeply downwards." },
      { term: "Drop Shot", definition: "A soft shot that drops just over the net in the opponent's forecourt." },
    ],
    photoGallery: [
      { imageUrl: "https://placehold.co/600x400.png", caption: "A player jumps for a powerful smash.", hint: "badminton smash" },
      { imageUrl: "https://placehold.co/600x400.png", caption: "A delicate drop shot close to the net.", hint: "badminton net" },
      { imageUrl: "https://placehold.co/600x400.png", caption: "The shuttlecock in high-speed motion.", hint: "badminton shuttlecock" },
    ],
  },
];

export const getSportById = (id: string | null): Sport | null => {
  if (!id) return null;
  return sportsData.find(sport => sport.id === id) || null;
}
