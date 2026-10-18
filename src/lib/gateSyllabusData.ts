import { Subject } from "./types";

export const GATE_2027_CS_SYLLABUS: Subject[] = [
  {
    id: "gate-sub-ga",
    name: "General Aptitude",
    code: "GA-01",
    chapters: [
      {
        id: "gate-ch-ga-1",
        title: "Verbal Aptitude",
        microTopics: [
          { id: "gt-ga-1-1", title: "Basic English grammar (tenses, prepositions, conjunctions, verb agreement)", isCompleted: false, completedThisWeek: false },
          { id: "gt-ga-1-2", title: "Vocabulary, word analogy & sentence completion", isCompleted: false, completedThisWeek: false },
          { id: "gt-ga-1-3", title: "Reading comprehension & critical reasoning", isCompleted: false, completedThisWeek: false },
          { id: "gt-ga-1-4", title: "Narrative sequencing & idioms", isCompleted: false, completedThisWeek: false }
        ]
      },
      {
        id: "gate-ch-ga-2",
        title: "Quantitative Aptitude",
        microTopics: [
          { id: "gt-ga-2-1", title: "Data interpretation (tables, graphs, pie charts, histograms)", isCompleted: false, completedThisWeek: false },
          { id: "gt-ga-2-2", title: "Numerical computation (ratios, percentages, powers, logarithms)", isCompleted: false, completedThisWeek: false },
          { id: "gt-ga-2-3", title: "Permutations, combinations & elementary probability", isCompleted: false, completedThisWeek: false },
          { id: "gt-ga-2-4", title: "Series, progressions & coordinate geometry", isCompleted: false, completedThisWeek: false }
        ]
      },
      {
        id: "gate-ch-ga-3",
        title: "Analytical & Spatial Aptitude",
        microTopics: [
          { id: "gt-ga-3-1", title: "Deductive & inductive logic, syllogisms", isCompleted: false, completedThisWeek: false },
          { id: "gt-ga-3-2", title: "Number & alphabet series analogies", isCompleted: false, completedThisWeek: false },
          { id: "gt-ga-3-3", title: "Spatial transformations (translation, rotation, scaling, mirroring)", isCompleted: false, completedThisWeek: false },
          { id: "gt-ga-3-4", title: "Paper folding, cutting & 2D/3D visualization", isCompleted: false, completedThisWeek: false }
        ]
      }
    ]
  },
  {
    id: "gate-sub-em",
    name: "Engineering Mathematics",
    code: "EM-02",
    chapters: [
      {
        id: "gate-ch-em-1",
        title: "Discrete Mathematics & Set Theory",
        microTopics: [
          { id: "gt-em-1-1", title: "Propositional and first-order predicate logic & quantifiers", isCompleted: false, completedThisWeek: false },
          { id: "gt-em-1-2", title: "Sets, relations, partial order relations, lattices & equivalence", isCompleted: false, completedThisWeek: false },
          { id: "gt-em-1-3", title: "Monoids, groups, subgroups & algebraic structures", isCompleted: false, completedThisWeek: false },
          { id: "gt-em-1-4", title: "Combinatorics, counting, recurrence relations & generating functions", isCompleted: false, completedThisWeek: false }
        ]
      },
      {
        id: "gate-ch-em-2",
        title: "Graph Theory",
        microTopics: [
          { id: "gt-em-2-1", title: "Graph connectivity, paths, cycles & trees", isCompleted: false, completedThisWeek: false },
          { id: "gt-em-2-2", title: "Eulerian & Hamiltonian graphs and vertex degrees", isCompleted: false, completedThisWeek: false },
          { id: "gt-em-2-3", title: "Planar graphs, dual graphs & Euler's formula", isCompleted: false, completedThisWeek: false },
          { id: "gt-em-2-4", title: "Graph coloring (chromatic number) and maximum matchings", isCompleted: false, completedThisWeek: false }
        ]
      },
      {
        id: "gate-ch-em-3",
        title: "Linear Algebra",
        microTopics: [
          { id: "gt-em-3-1", title: "Matrices, determinants & rank of a matrix", isCompleted: false, completedThisWeek: false },
          { id: "gt-em-3-2", title: "Systems of linear equations & Gauss elimination", isCompleted: false, completedThisWeek: false },
          { id: "gt-em-3-3", title: "Eigenvalues, eigenvectors & characteristic equation", isCompleted: false, completedThisWeek: false },
          { id: "gt-em-3-4", title: "Cayley-Hamilton theorem & LU decomposition", isCompleted: false, completedThisWeek: false }
        ]
      },
      {
        id: "gate-ch-em-4",
        title: "Calculus",
        microTopics: [
          { id: "gt-em-4-1", title: "Limits, continuity & differentiability", isCompleted: false, completedThisWeek: false },
          { id: "gt-em-4-2", title: "Maxima, minima & Rolle's / Mean Value Theorems", isCompleted: false, completedThisWeek: false },
          { id: "gt-em-4-3", title: "Definite integrals & improper integrals", isCompleted: false, completedThisWeek: false }
        ]
      },
      {
        id: "gate-ch-em-5",
        title: "Probability & Statistics",
        microTopics: [
          { id: "gt-em-5-1", title: "Conditional probability, independence & Bayes Theorem", isCompleted: false, completedThisWeek: false },
          { id: "gt-em-5-2", title: "Discrete distributions: Binomial & Poisson distributions", isCompleted: false, completedThisWeek: false },
          { id: "gt-em-5-3", title: "Continuous distributions: Uniform & Normal distributions", isCompleted: false, completedThisWeek: false },
          { id: "gt-em-5-4", title: "Mean, median, mode, variance & covariance", isCompleted: false, completedThisWeek: false }
        ]
      }
    ]
  },
  {
    id: "gate-sub-dl",
    name: "Digital Logic",
    code: "DL-03",
    chapters: [
      {
        id: "gate-ch-dl-1",
        title: "Boolean Algebra & Minimization",
        microTopics: [
          { id: "gt-dl-1-1", title: "Boolean laws, canonical SOP & POS representations", isCompleted: false, completedThisWeek: false },
          { id: "gt-dl-1-2", title: "Karnaugh Maps (2, 3, 4 variables) & essential prime implicants", isCompleted: false, completedThisWeek: false },
          { id: "gt-dl-1-3", title: "Quine-McCluskey tabular minimization algorithm", isCompleted: false, completedThisWeek: false },
          { id: "gt-dl-1-4", title: "Universal gates (NAND/NOR) and logic realizations", isCompleted: false, completedThisWeek: false }
        ]
      },
      {
        id: "gate-ch-dl-2",
        title: "Combinational Circuits",
        microTopics: [
          { id: "gt-dl-2-1", title: "Binary adders, subtractors & Carry Lookahead Adders (CLA)", isCompleted: false, completedThisWeek: false },
          { id: "gt-dl-2-2", title: "Multiplexers (2:1, 4:1, 8:1) and function implementation", isCompleted: false, completedThisWeek: false },
          { id: "gt-dl-2-3", title: "Decoders, priority encoders & code converters", isCompleted: false, completedThisWeek: false },
          { id: "gt-dl-2-4", title: "Comparators & digital parity checkers", isCompleted: false, completedThisWeek: false }
        ]
      },
      {
        id: "gate-ch-dl-3",
        title: "Sequential Circuits",
        microTopics: [
          { id: "gt-dl-3-1", title: "Latches & Flip-Flops (SR, JK, D, T excitation & state tables)", isCompleted: false, completedThisWeek: false },
          { id: "gt-dl-3-2", title: "Synchronous & asynchronous ripple counters, modulus calculation", isCompleted: false, completedThisWeek: false },
          { id: "gt-dl-3-3", title: "Ring counters, Johnson counters & shift registers", isCompleted: false, completedThisWeek: false },
          { id: "gt-dl-3-4", title: "Finite State Machines: Mealy vs Moore state diagrams & timing", isCompleted: false, completedThisWeek: false }
        ]
      },
      {
        id: "gate-ch-dl-4",
        title: "Number Representations",
        microTopics: [
          { id: "gt-dl-4-1", title: "Signed magnitude, 1's and 2's complement arithmetic", isCompleted: false, completedThisWeek: false },
          { id: "gt-dl-4-2", title: "IEEE 754 single and double precision floating point format", isCompleted: false, completedThisWeek: false },
          { id: "gt-dl-4-3", title: "Arithmetic overflow conditions and range analysis", isCompleted: false, completedThisWeek: false }
        ]
      }
    ]
  },
  {
    id: "gate-sub-coa",
    name: "Computer Organization and Architecture",
    code: "COA-04",
    chapters: [
      {
        id: "gate-ch-coa-1",
        title: "Machine Instructions & Addressing",
        microTopics: [
          { id: "gt-coa-1-1", title: "Instruction formats (3, 2, 1, 0 address & stack machines)", isCompleted: false, completedThisWeek: false },
          { id: "gt-coa-1-2", title: "Addressing modes: immediate, direct, indirect, register indirect, indexed", isCompleted: false, completedThisWeek: false },
          { id: "gt-coa-1-3", title: "Instruction cycle, execution phases & ALU datapath", isCompleted: false, completedThisWeek: false },
          { id: "gt-coa-1-4", title: "Hardwired vs microprogrammed control unit architecture", isCompleted: false, completedThisWeek: false }
        ]
      },
      {
        id: "gate-ch-coa-2",
        title: "Memory Hierarchy & Cache Design",
        microTopics: [
          { id: "gt-coa-2-1", title: "Locality of reference: spatial and temporal locality", isCompleted: false, completedThisWeek: false },
          { id: "gt-coa-2-2", title: "Cache mapping: direct mapped, fully associative, set-associative (tag/index/offset)", isCompleted: false, completedThisWeek: false },
          { id: "gt-coa-2-3", title: "Average Memory Access Time (AMAT) and multi-level cache access", isCompleted: false, completedThisWeek: false },
          { id: "gt-coa-2-4", title: "Cache write policies (write-through, write-back, write-allocate) & replacement (LRU/FIFO)", isCompleted: false, completedThisWeek: false }
        ]
      },
      {
        id: "gate-ch-coa-3",
        title: "Pipelining & Hazards",
        microTopics: [
          { id: "gt-coa-3-1", title: "Linear instruction pipelining, clock cycle time & throughput", isCompleted: false, completedThisWeek: false },
          { id: "gt-coa-3-2", title: "Structural, data (RAW, WAR, WAW) and control hazards", isCompleted: false, completedThisWeek: false },
          { id: "gt-coa-3-3", title: "Hazard mitigation: operand forwarding, stalls & branch prediction", isCompleted: false, completedThisWeek: false },
          { id: "gt-coa-3-4", title: "Speedup and pipeline efficiency calculations", isCompleted: false, completedThisWeek: false }
        ]
      },
      {
        id: "gate-ch-coa-4",
        title: "I/O Interface & Storage",
        microTopics: [
          { id: "gt-coa-4-1", title: "Programmed I/O vs interrupt-driven I/O", isCompleted: false, completedThisWeek: false },
          { id: "gt-coa-4-2", title: "Vectored and non-vectored interrupts, priority interrupt schemes", isCompleted: false, completedThisWeek: false },
          { id: "gt-coa-4-3", title: "Direct Memory Access (DMA) burst vs cycle stealing modes", isCompleted: false, completedThisWeek: false }
        ]
      }
    ]
  },
  {
    id: "gate-sub-pds",
    name: "Programming and Data Structures",
    code: "PDS-05",
    chapters: [
      {
        id: "gate-ch-pds-1",
        title: "Programming in C",
        microTopics: [
          { id: "gt-pds-1-1", title: "Data types, operators, scope and storage classes in C", isCompleted: false, completedThisWeek: false },
          { id: "gt-pds-1-2", title: "Pointers, arrays, 2D pointer arithmetic & string operations", isCompleted: false, completedThisWeek: false },
          { id: "gt-pds-1-3", title: "Recursion execution tree, activation records & call stack", isCompleted: false, completedThisWeek: false },
          { id: "gt-pds-1-4", title: "Dynamic memory allocation: malloc, calloc, realloc, free", isCompleted: false, completedThisWeek: false }
        ]
      },
      {
        id: "gate-ch-pds-2",
        title: "Linear Data Structures",
        microTopics: [
          { id: "gt-pds-2-1", title: "Singly, doubly and circular linked lists with pointer manipulation", isCompleted: false, completedThisWeek: false },
          { id: "gt-pds-2-2", title: "Stacks: push/pop, infix to postfix conversion & postfix evaluation", isCompleted: false, completedThisWeek: false },
          { id: "gt-pds-2-3", title: "Queues: linear queue, circular queue wrap-around & deques", isCompleted: false, completedThisWeek: false }
        ]
      },
      {
        id: "gate-ch-pds-3",
        title: "Trees & Binary Search Trees",
        microTopics: [
          { id: "gt-pds-3-1", title: "Binary tree representations and tree traversals (inorder, preorder, postorder)", isCompleted: false, completedThisWeek: false },
          { id: "gt-pds-3-2", title: "Binary Search Trees (BST): insertion, search, deletion & properties", isCompleted: false, completedThisWeek: false },
          { id: "gt-pds-3-3", title: "AVL Trees: balance factors and rotations (LL, RR, LR, RL)", isCompleted: false, completedThisWeek: false },
          { id: "gt-pds-3-4", title: "Binary Heaps: min-heap, max-heap, heapify & priority queue operations", isCompleted: false, completedThisWeek: false }
        ]
      },
      {
        id: "gate-ch-pds-4",
        title: "Hashing",
        microTopics: [
          { id: "gt-pds-4-1", title: "Hash functions (division, multiplication, mid-square)", isCompleted: false, completedThisWeek: false },
          { id: "gt-pds-4-2", title: "Collision resolution by separate chaining", isCompleted: false, completedThisWeek: false },
          { id: "gt-pds-4-3", title: "Open addressing: linear probing, quadratic probing & double hashing", isCompleted: false, completedThisWeek: false }
        ]
      }
    ]
  },
  {
    id: "gate-sub-algo",
    name: "Algorithms",
    code: "ALGO-06",
    chapters: [
      {
        id: "gate-ch-algo-1",
        title: "Asymptotic Analysis & Recurrences",
        microTopics: [
          { id: "gt-algo-1-1", title: "Asymptotic notations: Big-O, Big-Omega, Big-Theta, Little-o, Little-omega", isCompleted: false, completedThisWeek: false },
          { id: "gt-algo-1-2", title: "Solving recurrences: Master Theorem for divide-and-conquer", isCompleted: false, completedThisWeek: false },
          { id: "gt-algo-1-3", title: "Recursion tree method & substitution method proofs", isCompleted: false, completedThisWeek: false }
        ]
      },
      {
        id: "gate-ch-algo-2",
        title: "Sorting & Searching",
        microTopics: [
          { id: "gt-algo-2-1", title: "Comparison sorts: Quicksort (best/worst/average case) & Merge sort", isCompleted: false, completedThisWeek: false },
          { id: "gt-algo-2-2", title: "Heapsort, in-place sorting & stability of sorting algorithms", isCompleted: false, completedThisWeek: false },
          { id: "gt-algo-2-3", title: "Linear-time sorts: Counting sort & Radix sort", isCompleted: false, completedThisWeek: false },
          { id: "gt-algo-2-4", title: "Lower bound for comparison sorting Omega(n log n)", isCompleted: false, completedThisWeek: false }
        ]
      },
      {
        id: "gate-ch-algo-3",
        title: "Algorithm Paradigms (Greedy & Dynamic Programming)",
        microTopics: [
          { id: "gt-algo-3-1", title: "Greedy algorithms: Huffman coding, fractional knapsack & interval scheduling", isCompleted: false, completedThisWeek: false },
          { id: "gt-algo-3-2", title: "Dynamic programming: 0/1 knapsack problem", isCompleted: false, completedThisWeek: false },
          { id: "gt-algo-3-3", title: "Matrix Chain Multiplication & optimal parenthesization", isCompleted: false, completedThisWeek: false },
          { id: "gt-algo-3-4", title: "Longest Common Subsequence (LCS) & subset sum", isCompleted: false, completedThisWeek: false }
        ]
      },
      {
        id: "gate-ch-algo-4",
        title: "Graph Algorithms",
        microTopics: [
          { id: "gt-algo-4-1", title: "Breadth-First Search (BFS) and Depth-First Search (DFS) traversal properties", isCompleted: false, completedThisWeek: false },
          { id: "gt-algo-4-2", title: "Minimum Spanning Tree: Kruskal's & Prim's algorithms", isCompleted: false, completedThisWeek: false },
          { id: "gt-algo-4-3", title: "Shortest paths: Dijkstra's single source shortest path algorithm", isCompleted: false, completedThisWeek: false },
          { id: "gt-algo-4-4", title: "Bellman-Ford algorithm (negative edge weights) & Floyd-Warshall all-pairs", isCompleted: false, completedThisWeek: false },
          { id: "gt-algo-4-5", title: "Topological sorting & Strongly Connected Components (Kosaraju / Tarjan)", isCompleted: false, completedThisWeek: false }
        ]
      },
      {
        id: "gate-ch-algo-5",
        title: "NP-Completeness",
        microTopics: [
          { id: "gt-algo-5-1", title: "Complexity classes P, NP, NP-Complete, and NP-Hard", isCompleted: false, completedThisWeek: false },
          { id: "gt-algo-5-2", title: "Polynomial-time reductions and Cook-Levin theorem", isCompleted: false, completedThisWeek: false },
          { id: "gt-algo-5-3", title: "Standard NP-complete problems (3-SAT, Clique, Vertex Cover, Hamiltonian Cycle)", isCompleted: false, completedThisWeek: false }
        ]
      }
    ]
  },
  {
    id: "gate-sub-toc",
    name: "Theory of Computation",
    code: "TOC-07",
    chapters: [
      {
        id: "gate-ch-toc-1",
        title: "Regular Languages & Finite Automata",
        microTopics: [
          { id: "gt-toc-1-1", title: "Deterministic Finite Automata (DFA) state construction & transition functions", isCompleted: false, completedThisWeek: false },
          { id: "gt-toc-1-2", title: "Nondeterministic Finite Automata (NFA), epsilon-NFA & subset construction", isCompleted: false, completedThisWeek: false },
          { id: "gt-toc-1-3", title: "Regular expressions, Arden's theorem & language equivalence", isCompleted: false, completedThisWeek: false },
          { id: "gt-toc-1-4", title: "DFA state minimization using Myhill-Nerode theorem & table filling", isCompleted: false, completedThisWeek: false },
          { id: "gt-toc-1-5", title: "Pumping Lemma for regular languages & non-regular proofs", isCompleted: false, completedThisWeek: false },
          { id: "gt-toc-1-6", title: "Closure and decision properties of regular languages", isCompleted: false, completedThisWeek: false }
        ]
      },
      {
        id: "gate-ch-toc-2",
        title: "Context-Free Languages & Pushdown Automata",
        microTopics: [
          { id: "gt-toc-2-1", title: "Context-Free Grammars (CFG), derivations & parse trees", isCompleted: false, completedThisWeek: false },
          { id: "gt-toc-2-2", title: "Grammar ambiguity & inherently ambiguous context-free languages", isCompleted: false, completedThisWeek: false },
          { id: "gt-toc-2-3", title: "Pushdown Automata (DPDA vs NPDA) acceptance by final state & empty stack", isCompleted: false, completedThisWeek: false },
          { id: "gt-toc-2-4", title: "Pumping Lemma for CFLs & non-CFL proofs", isCompleted: false, completedThisWeek: false },
          { id: "gt-toc-2-5", title: "Closure properties and decidability for Context-Free Languages", isCompleted: false, completedThisWeek: false }
        ]
      },
      {
        id: "gate-ch-toc-3",
        title: "Turing Machines & Undecidability",
        microTopics: [
          { id: "gt-toc-3-1", title: "Standard Turing Machine models, tape operations & Church-Turing thesis", isCompleted: false, completedThisWeek: false },
          { id: "gt-toc-3-2", title: "Recursive (REC) vs Recursively Enumerable (RE) languages", isCompleted: false, completedThisWeek: false },
          { id: "gt-toc-3-3", title: "Halting problem of Turing machines & proof of undecidability", isCompleted: false, completedThisWeek: false },
          { id: "gt-toc-3-4", title: "Rice's Theorem and Post Correspondence Problem (PCP)", isCompleted: false, completedThisWeek: false }
        ]
      }
    ]
  },
  {
    id: "gate-sub-cd",
    name: "Compiler Design",
    code: "CD-08",
    chapters: [
      {
        id: "gate-ch-cd-1",
        title: "Lexical Analysis",
        microTopics: [
          { id: "gt-cd-1-1", title: "Lexemes, tokens, patterns & lexical analyzer generator (Lex)", isCompleted: false, completedThisWeek: false },
          { id: "gt-cd-1-2", title: "Input buffering, sentinels & regular expression matching", isCompleted: false, completedThisWeek: false }
        ]
      },
      {
        id: "gate-ch-cd-2",
        title: "Syntax Analysis & Parsing",
        microTopics: [
          { id: "gt-cd-2-1", title: "Top-down parsing: Left recursion elimination & left factoring", isCompleted: false, completedThisWeek: false },
          { id: "gt-cd-2-2", title: "First & Follow sets computation, LL(1) parse table construction & conflicts", isCompleted: false, completedThisWeek: false },
          { id: "gt-cd-2-3", title: "Bottom-up parsing: Shift-Reduce parsing & handle pruning", isCompleted: false, completedThisWeek: false },
          { id: "gt-cd-2-4", title: "LR(0) and SLR(1) parsing table construction & shift-reduce/reduce-reduce conflicts", isCompleted: false, completedThisWeek: false },
          { id: "gt-cd-2-5", title: "CLR(1) and LALR(1) item sets, lookahead merging & parsing power hierarchy", isCompleted: false, completedThisWeek: false }
        ]
      },
      {
        id: "gate-ch-cd-3",
        title: "Syntax Directed Translation & Intermediate Code",
        microTopics: [
          { id: "gt-cd-3-1", title: "Syntax Directed Definitions (SDD): synthesized vs inherited attributes", isCompleted: false, completedThisWeek: false },
          { id: "gt-cd-3-2", title: "S-attributed and L-attributed translation schemes", isCompleted: false, completedThisWeek: false },
          { id: "gt-cd-3-3", title: "Intermediate code representations: Three-address code, quadruples & triples", isCompleted: false, completedThisWeek: false },
          { id: "gt-cd-3-4", title: "Directed Acyclic Graph (DAG) construction for basic blocks", isCompleted: false, completedThisWeek: false }
        ]
      },
      {
        id: "gate-ch-cd-4",
        title: "Code Optimization & Generation",
        microTopics: [
          { id: "gt-cd-4-1", title: "Basic blocks and control flow graphs (CFG)", isCompleted: false, completedThisWeek: false },
          { id: "gt-cd-4-2", title: "Machine-independent optimizations: Common subexpression elimination, dead code elimination", isCompleted: false, completedThisWeek: false },
          { id: "gt-cd-4-3", title: "Loop optimizations: code motion, strength reduction & induction variable elimination", isCompleted: false, completedThisWeek: false },
          { id: "gt-cd-4-4", title: "Register allocation, liveness analysis & target code generation", isCompleted: false, completedThisWeek: false }
        ]
      }
    ]
  },
  {
    id: "gate-sub-os",
    name: "Operating Systems",
    code: "OS-09",
    chapters: [
      {
        id: "gate-ch-os-1",
        title: "Processes & CPU Scheduling",
        microTopics: [
          { id: "gt-os-1-1", title: "Process lifecycle, Process Control Block (PCB) & context switching", isCompleted: false, completedThisWeek: false },
          { id: "gt-os-1-2", title: "User vs kernel threads, fork() system call semantics", isCompleted: false, completedThisWeek: false },
          { id: "gt-os-1-3", title: "CPU scheduling metrics: Turnaround Time, Waiting Time, Response Time", isCompleted: false, completedThisWeek: false },
          { id: "gt-os-1-4", title: "Scheduling algorithms: FCFS, SJF, Shortest Remaining Time First (SRTF)", isCompleted: false, completedThisWeek: false },
          { id: "gt-os-1-5", title: "Round Robin scheduling (time quantum tuning) & Priority scheduling", isCompleted: false, completedThisWeek: false }
        ]
      },
      {
        id: "gate-ch-os-2",
        title: "Process Synchronization & Deadlocks",
        microTopics: [
          { id: "gt-os-2-1", title: "Critical Section problem criteria: mutual exclusion, progress, bounded waiting", isCompleted: false, completedThisWeek: false },
          { id: "gt-os-2-2", title: "Peterson's algorithm and hardware support (Test-and-Set, Compare-and-Swap)", isCompleted: false, completedThisWeek: false },
          { id: "gt-os-2-3", title: "Counting and binary semaphores with wait() and signal() operations", isCompleted: false, completedThisWeek: false },
          { id: "gt-os-2-4", title: "Classic synchronization problems: Producer-Consumer, Reader-Writer, Dining Philosophers", isCompleted: false, completedThisWeek: false },
          { id: "gt-os-2-5", title: "Four Coffman conditions for deadlock & Resource Allocation Graph (RAG)", isCompleted: false, completedThisWeek: false },
          { id: "gt-os-2-6", title: "Banker's Algorithm for deadlock avoidance (safety algorithm & resource request)", isCompleted: false, completedThisWeek: false }
        ]
      },
      {
        id: "gate-ch-os-3",
        title: "Memory Management & Virtual Memory",
        microTopics: [
          { id: "gt-os-3-1", title: "Contiguous allocation, internal vs external fragmentation & compaction", isCompleted: false, completedThisWeek: false },
          { id: "gt-os-3-2", title: "Paging hardware, page table structures & multi-level paging", isCompleted: false, completedThisWeek: false },
          { id: "gt-os-3-3", title: "Translation Lookaside Buffer (TLB) & Effective Memory Access Time (EMAT) calculations", isCompleted: false, completedThisWeek: false },
          { id: "gt-os-3-4", title: "Demand paging, page fault handling sequence & Belady's Anomaly", isCompleted: false, completedThisWeek: false },
          { id: "gt-os-3-5", title: "Page replacement algorithms: FIFO, Least Recently Used (LRU), Optimal (OPT)", isCompleted: false, completedThisWeek: false },
          { id: "gt-os-3-6", title: "Thrashing and working set model", isCompleted: false, completedThisWeek: false }
        ]
      },
      {
        id: "gate-ch-os-4",
        title: "Storage & File Systems",
        microTopics: [
          { id: "gt-os-4-1", title: "Disk structure, seek time, rotational latency & transfer time calculations", isCompleted: false, completedThisWeek: false },
          { id: "gt-os-4-2", title: "Disk scheduling algorithms: FCFS, SSTF, SCAN, C-SCAN, LOOK, C-LOOK", isCompleted: false, completedThisWeek: false },
          { id: "gt-os-4-3", title: "File allocation methods: contiguous, linked & indexed inode structures", isCompleted: false, completedThisWeek: false }
        ]
      }
    ]
  },
  {
    id: "gate-sub-dbms",
    name: "Databases",
    code: "DBMS-10",
    chapters: [
      {
        id: "gate-ch-dbms-1",
        title: "Relational Model & Relational Algebra",
        microTopics: [
          { id: "gt-dbms-1-1", title: "ER diagrams: entities, relationships, cardinalities & participation constraints", isCompleted: false, completedThisWeek: false },
          { id: "gt-dbms-1-2", title: "Relational model: schemas, keys (primary, candidate, foreign), integrity constraints", isCompleted: false, completedThisWeek: false },
          { id: "gt-dbms-1-3", title: "Relational algebra operations: selection, projection, cartesian product, joins & division", isCompleted: false, completedThisWeek: false },
          { id: "gt-dbms-1-4", title: "Tuple and Domain Relational Calculus", isCompleted: false, completedThisWeek: false }
        ]
      },
      {
        id: "gate-ch-dbms-2",
        title: "SQL & Querying",
        microTopics: [
          { id: "gt-dbms-2-1", title: "DDL, DML, DCL queries & constraints", isCompleted: false, completedThisWeek: false },
          { id: "gt-dbms-2-2", title: "Aggregate functions, GROUP BY, HAVING clause & NULL handling", isCompleted: false, completedThisWeek: false },
          { id: "gt-dbms-2-3", title: "Nested subqueries, EXISTS, IN, NOT EXISTS & correlated subqueries", isCompleted: false, completedThisWeek: false },
          { id: "gt-dbms-2-4", title: "Inner, left outer, right outer & full outer joins", isCompleted: false, completedThisWeek: false }
        ]
      },
      {
        id: "gate-ch-dbms-3",
        title: "Database Normalization",
        microTopics: [
          { id: "gt-dbms-3-1", title: "Functional dependencies (FDs), Armstrong's axioms & attribute closure", isCompleted: false, completedThisWeek: false },
          { id: "gt-dbms-3-2", title: "Minimal cover / canonical cover determination", isCompleted: false, completedThisWeek: false },
          { id: "gt-dbms-3-3", title: "Candidate keys and super keys computation", isCompleted: false, completedThisWeek: false },
          { id: "gt-dbms-3-4", title: "Normal forms: 1NF, 2NF, 3NF & Boyce-Codd Normal Form (BCNF)", isCompleted: false, completedThisWeek: false },
          { id: "gt-dbms-3-5", title: "Lossless join decomposition test & dependency preservation verification", isCompleted: false, completedThisWeek: false }
        ]
      },
      {
        id: "gate-ch-dbms-4",
        title: "Transactions & Concurrency Control",
        microTopics: [
          { id: "gt-dbms-4-1", title: "Transaction ACID properties & states (active, committed, aborted)", isCompleted: false, completedThisWeek: false },
          { id: "gt-dbms-4-2", title: "Schedules: serial, conflict serializable & view serializable schedules", isCompleted: false, completedThisWeek: false },
          { id: "gt-dbms-4-3", title: "Precedence / serialization graph for conflict serializability", isCompleted: false, completedThisWeek: false },
          { id: "gt-dbms-4-4", title: "Recoverability: recoverable, cascadeless & strict schedules", isCompleted: false, completedThisWeek: false },
          { id: "gt-dbms-4-5", title: "Two-Phase Locking (2PL, Strict 2PL, Rigorous 2PL) & deadlock handling", isCompleted: false, completedThisWeek: false },
          { id: "gt-dbms-4-6", title: "Timestamp ordering protocol & Thomas' Write Rule", isCompleted: false, completedThisWeek: false }
        ]
      },
      {
        id: "gate-ch-dbms-5",
        title: "Indexing & Storage",
        microTopics: [
          { id: "gt-dbms-5-1", title: "Primary, secondary, and clustering indices (dense vs sparse)", isCompleted: false, completedThisWeek: false },
          { id: "gt-dbms-5-2", title: "B-Trees and B+ Trees: node structure, order, minimum & maximum keys", isCompleted: false, completedThisWeek: false },
          { id: "gt-dbms-5-3", title: "B+ Tree insertion, deletion and search I/O block access calculations", isCompleted: false, completedThisWeek: false }
        ]
      }
    ]
  },
  {
    id: "gate-sub-cn",
    name: "Computer Networks",
    code: "CN-11",
    chapters: [
      {
        id: "gate-ch-cn-1",
        title: "Data Link Layer & MAC Protocols",
        microTopics: [
          { id: "gt-cn-1-1", title: "Framing (character count, byte stuffing, bit stuffing)", isCompleted: false, completedThisWeek: false },
          { id: "gt-cn-1-2", title: "Error detection: Parity, 16-bit Checksum & Cyclic Redundancy Check (CRC polynomial division)", isCompleted: false, completedThisWeek: false },
          { id: "gt-cn-1-3", title: "Flow control: Stop-and-Wait protocol efficiency & bandwidth-delay product", isCompleted: false, completedThisWeek: false },
          { id: "gt-cn-1-4", title: "Sliding window protocols: Go-Back-N (GBN) vs Selective Repeat (SR) window sizes", isCompleted: false, completedThisWeek: false },
          { id: "gt-cn-1-5", title: "Medium Access Control: Pure ALOHA, Slotted ALOHA & CSMA/CD backoff algorithm", isCompleted: false, completedThisWeek: false }
        ]
      },
      {
        id: "gate-ch-cn-2",
        title: "Network Layer & IP Addressing",
        microTopics: [
          { id: "gt-cn-2-1", title: "IPv4 header fields (TTL, Identification, Flags, Fragment Offset calculations)", isCompleted: false, completedThisWeek: false },
          { id: "gt-cn-2-2", title: "Classless Inter-Domain Routing (CIDR) subnetting, supernetting & longest prefix matching", isCompleted: false, completedThisWeek: false },
          { id: "gt-cn-2-3", title: "Routing algorithms: Distance Vector (Bellman-Ford, count-to-infinity) & Link State (Dijkstra)", isCompleted: false, completedThisWeek: false },
          { id: "gt-cn-2-4", title: "Routing protocols: RIP, OSPF, BGP & autonomous systems", isCompleted: false, completedThisWeek: false },
          { id: "gt-cn-2-5", title: "ARP, RARP, ICMP & Network Address Translation (NAT / PAT)", isCompleted: false, completedThisWeek: false },
          { id: "gt-cn-2-6", title: "IPv6 header structure and comparison with IPv4", isCompleted: false, completedThisWeek: false }
        ]
      },
      {
        id: "gate-ch-cn-3",
        title: "Transport Layer",
        microTopics: [
          { id: "gt-cn-3-1", title: "UDP header format, port numbers & pseudo-header checksum calculation", isCompleted: false, completedThisWeek: false },
          { id: "gt-cn-3-2", title: "TCP segment format, sequence numbers & control flags (SYN, ACK, FIN, RST, PSH, URG)", isCompleted: false, completedThisWeek: false },
          { id: "gt-cn-3-3", title: "TCP 3-way handshake connection establishment & 4-way termination", isCompleted: false, completedThisWeek: false },
          { id: "gt-cn-3-4", title: "TCP sliding window flow control & silly window syndrome", isCompleted: false, completedThisWeek: false },
          { id: "gt-cn-3-5", title: "TCP congestion control: Slow Start, Congestion Avoidance, Fast Retransmit & Fast Recovery", isCompleted: false, completedThisWeek: false }
        ]
      },
      {
        id: "gate-ch-cn-4",
        title: "Application Layer & Security",
        microTopics: [
          { id: "gt-cn-4-1", title: "DNS: recursive vs iterative queries, resource records & root servers", isCompleted: false, completedThisWeek: false },
          { id: "gt-cn-4-2", title: "HTTP 1.0 vs 1.1 (persistent connections) and HTTP/2, cookies & caching", isCompleted: false, completedThisWeek: false },
          { id: "gt-cn-4-3", title: "Email protocols: SMTP (push), POP3 & IMAP (retrieval)", isCompleted: false, completedThisWeek: false },
          { id: "gt-cn-4-4", title: "Network security: RSA public-key cryptography, Diffie-Hellman & digital signatures", isCompleted: false, completedThisWeek: false }
        ]
      }
    ]
  }
];
