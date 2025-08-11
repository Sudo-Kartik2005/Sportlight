export type Sport = {
  id: string;
  name: string;
  history: string;
  rules: { title: string; content: string }[];
  keyTerms: { term: string; definition: string }[];
  videoTutorials: { title: string; videoId: string }[];
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
    videoTutorials: [
      { title: "Beginner's Guide to Tennis", videoId: "fpl_S11a_JA" },
      { title: "How to Hit a Forehand", videoId: "ALj_1E_if3w" },
      { title: "Mastering the Serve", videoId: "pDLaF0aR_s0" },
    ],
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
    videoTutorials: [
      { title: "Basketball Rules for Beginners", videoId: "ga5_F00P1sQ" },
      { title: "How to Dribble a Basketball", videoId: "L4_z_Q71L-o" },
      { title: "Shooting Form Tutorial", videoId: "0M1F4i_2S3s" },
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
    videoTutorials: [
      { title: "Badminton Basics for Beginners", videoId: "1tV9xJ1i4kY" },
      { title: "How to Smash in Badminton", videoId: "iL5g3c2p2A4" },
      { title: "Defensive Footwork Drills", videoId: "YFv_3k6pW_E" },
    ],
  },
];

export const getSportById = (id: string | null): Sport | null => {
  if (!id) return null;
  return sportsData.find(sport => sport.id === id) || null;
}
