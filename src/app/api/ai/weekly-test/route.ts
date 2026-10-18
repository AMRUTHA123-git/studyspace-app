import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { weeklyTopicIds } = await req.json();

    if (!weeklyTopicIds || !Array.isArray(weeklyTopicIds) || weeklyTopicIds.length === 0) {
      return NextResponse.json(
        { error: "No micro-topics provided from the active weekly study pool." },
        { status: 400 }
      );
    }

    // In production:
    // 1. Fetch titles and chapter contexts from database using Prisma:
    //    const topics = await prisma.microTopic.findMany({ where: { id: { in: weeklyTopicIds } } });
    // 2. Call Google Gemini API (gemini-1.5-flash / gemini-1.5-pro):
    //    const prompt = `Generate a 15-question revision test strictly covering these sub-topics: ...`;
    // 3. Return structured questions with options, correct answer, explanation.

    const mockGeneratedTest = {
      testId: `test-${Date.now()}`,
      title: "Weekly Revision Mock Test (Spaced Practice)",
      topicsCovered: weeklyTopicIds.length,
      durationMinutes: 25,
      questions: [
        {
          id: "q-1",
          questionText: "In the TCP 3-way handshake, what is the sequence of control flags exchanged between client and server?",
          options: [
            { id: "A", text: "SYN -> ACK -> SYN-ACK" },
            { id: "B", text: "SYN -> SYN-ACK -> ACK" },
            { id: "C", text: "ACK -> SYN -> ACK" },
            { id: "D", text: "SYN -> FIN -> ACK" }
          ],
          correctAnswer: "B",
          explanation: "TCP connection establishment requires client sending SYN, server acknowledging with SYN-ACK, and client confirming with ACK.",
          difficulty: 2
        },
        {
          id: "q-2",
          questionText: "How does TCP Reno respond upon detecting packet loss via three duplicate ACKs?",
          options: [
            { id: "A", text: "Drops congestion window (cwnd) directly to 1 MSS" },
            { id: "B", text: "Enters Fast Recovery, halves ssthresh, and sets cwnd to ssthresh + 3 MSS" },
            { id: "C", text: "Stops sending packets for 30 seconds" },
            { id: "D", text: "Triples the transmission rate" }
          ],
          correctAnswer: "B",
          explanation: "Fast Retransmit & Fast Recovery in TCP Reno avoids Slow Start timeout penalty by halving ssthresh and recovering dynamically.",
          difficulty: 3
        }
      ]
    };

    return NextResponse.json(mockGeneratedTest);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
