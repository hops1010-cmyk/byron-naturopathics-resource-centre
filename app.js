const questions = [
  {
    question: 'What is the “Type 3 diabetes” phrase used for in this guide?',
    options: ['A formally recognised diagnosis', 'A proposed research framing about brain insulin signalling', 'A replacement name for all dementias'],
    answer: 1,
    note: 'It is an informal hypothesis used to discuss possible links between brain insulin signalling and Alzheimer’s. It is not a formal diagnosis.',
  },
  {
    question: 'Which set of themes appears in the supplied mind map?',
    options: ['Gut–brain links, inflammation and brain energy', 'Bone density, hearing and vision', 'Only inherited genetic risk'],
    answer: 0,
    note: 'The map groups brain energy and insulin signalling with gut–brain and inflammatory themes.',
  },
  {
    question: 'How should you use the mind map?',
    options: ['As a diagnosis checklist', 'As a conversation starter, then check the sources', 'As proof that every connection is settled'],
    answer: 1,
    note: 'Visual summaries can simplify complex evidence. Follow the linked sources and discuss personal health questions with a clinician.',
  },
  {
    question: 'What is a useful next step when a health claim catches your attention?',
    options: ['Look for supporting research and its limitations', 'Assume the claim applies to everyone', 'Stop prescribed care immediately'],
    answer: 0,
    note: 'Check where a claim comes from, how strong the evidence is and whether it applies to the individual situation.',
  },
  {
    question: 'Does this resource centre replace medical advice?',
    options: ['Yes, for metabolic concerns', 'Only when paired with a quiz score', 'No, personal care belongs with a qualified health professional'],
    answer: 2,
    note: 'This site is for learning and reflection. Diagnosis and treatment decisions should be made with qualified health professionals.',
  },
]

const card = document.querySelector('#quiz-card')
if (card) {
  const progressLabel = document.querySelector('#progress-label')
  const progressFill = document.querySelector('#progress-fill')
  let current = 0
  let score = 0
  let answered = false

  function render() {
    if (current >= questions.length) {
      progressLabel.textContent = 'Complete · 5 questions'
      progressFill.style.width = '100%'
      card.innerHTML = `<div class="quiz-result"><p class="eyebrow">All done</p><strong>${score} / ${questions.length}</strong><p>${score === questions.length ? 'Excellent recall. Keep following the evidence.' : 'Thanks for taking a moment to reflect. Revisit the guide whenever you like.'}</p><button class="quiz-next" type="button" id="quiz-restart">Try again</button></div>`
      card.querySelector('#quiz-restart').addEventListener('click', () => { current = 0; score = 0; render() })
      return
    }

    const item = questions[current]
    answered = false
    progressLabel.textContent = `Question ${current + 1} of ${questions.length}`
    progressFill.style.width = `${((current + 1) / questions.length) * 100}%`
    card.innerHTML = `<p class="quiz-question">${item.question}</p><div class="quiz-options">${item.options.map((option, index) => `<button class="quiz-option" type="button" data-choice="${index}"><span class="option-letter">${String.fromCharCode(65 + index)}</span>${option}</button>`).join('')}</div><p class="quiz-feedback" id="quiz-feedback"></p><button class="quiz-next" id="quiz-next" type="button" disabled>${current === questions.length - 1 ? 'See results' : 'Next question'} →</button>`
    card.querySelectorAll('.quiz-option').forEach((button) => {
      button.addEventListener('click', () => {
        if (answered) return
        answered = true
        const choice = Number(button.dataset.choice)
        if (choice === item.answer) score += 1
        card.querySelectorAll('.quiz-option').forEach((option) => {
          option.disabled = true
          if (Number(option.dataset.choice) === item.answer) option.classList.add('correct')
        })
        if (choice !== item.answer) button.classList.add('incorrect')
        card.querySelector('#quiz-feedback').textContent = item.note
        card.querySelector('#quiz-next').disabled = false
      })
    })
    card.querySelector('#quiz-next').addEventListener('click', () => { current += 1; render() })
  }

  render()
}

const botForm = document.querySelector('#bot-form')
if (botForm) {
  const botInput = document.querySelector('#bot-input')
  const botMessages = document.querySelector('#bot-messages')

  const documents = [
    ['Alzheimer’s as a Metabolic and Inflammatory Disease: A Comprehensive Briefing', '/documents/alzheimer-metabolic-briefing.pdf', 'metabolic inflammation alzheimer brain'],
    ['Alzheimer’s Disease and Metabolic Health: A Comprehensive Study Guide', '/documents/alzheimer-metabolic-study-guide.pdf', 'metabolic health alzheimer diabetes'],
    ['Dementia and Cognitive Decline Studies on Systemic Factors — Table 1', '/documents/systemic-factors-table.pdf', 'dementia cognitive systemic factors'],
    ['The Metabolic and Systemic Landscape of Alzheimer’s Disease: A Holistic Framework', '/documents/metabolic-systemic-landscape.pdf', 'metabolic systemic holistic alzheimer'],
    ['The Neuro-Metabolic Frontier: Gut Microbiome and the “Type 3 Diabetes” Paradigm', '/documents/neuro-metabolic-frontier.pdf', 'gut microbiome diabetes neuro metabolic'],
    ['The Networked Anatomy of Alzheimer’s', '/documents/networked-anatomy.pdf', 'networked anatomy alzheimer brain'],
  ].map(([title, href, keywords]) => ({ title, href, keywords, kind: 'PDF' }))

  const videos = [
    ['The Alzheimer’s paradigm shift', '/media/Alzheimer_s_Paradigm_Shift.mp4', 'paradigm shift metabolic alzheimer'],
    ['How brains get “Type 3 diabetes”', '/media/How_Brains_Get_Type_3_Diabetes.mp4', 'brain diabetes insulin'],
    ['The holistic diagnostic', '/media/The_Holistic_Diagnostic__Redefining_Dementia.mp4', 'holistic diagnosis dementia'],
    ['The periphery-to-center pathway', '/media/The_Periphery-to-Center_Pathway.mp4', 'periphery center systemic pathway'],
  ].map(([title, href, keywords]) => ({ title, href, keywords, kind: 'VIDEO' }))

  const guideTopics = [
    { title: 'Alzheimer’s metabolic connections mind map', href: '#mindmap', keywords: 'brain insulin energy inflammation systemic gut microbiome amyloid clearance type 3 diabetes', kind: 'GUIDE' },
    { title: 'Part 1 holistic health overview', href: '#explore', keywords: 'holistic whole body metabolic brain health alzheimer', kind: 'GUIDE' },
  ]

  const summaries = [
    { keys: ['insulin', 'brain energy', 'energy'], text: 'The guide raises brain insulin signalling and energy use as themes in Alzheimer’s research. The mind map presents them as topics to investigate; it does not establish a single cause or diagnosis.' },
    { keys: ['inflammation', 'immune'], text: 'Systemic inflammation appears in the supplied mind map as a possible part of the wider context around brain health. The guide treats this as a research theme to evaluate against evidence, not a settled explanation.' },
    { keys: ['gut', 'microbiome', 'gut brain'], text: 'The mind map includes a gut–brain connection, placing gut health among the systemic topics being explored alongside brain energy and inflammation. It is a proposed connection, not a proven cause in this guide.' },
    { keys: ['amyloid', 'clearance'], text: 'The infographic raises amyloid clearance as another topic in the broader picture. It is a visual summary’s claim and should be checked against the linked research; the site does not present it as a complete account of Alzheimer’s.' },
    { keys: ['type 3', 'diabetes'], text: '“Type 3 diabetes” is used here as an informal research hypothesis about brain insulin signalling. It is not a formally recognised diagnosis and does not mean Alzheimer’s is the same condition as diabetes.' },
    { keys: ['holistic', 'whole body', 'systemic'], text: 'The guide takes a whole-body lens: it invites readers to explore how metabolic health, inflammation and gut–brain questions may relate to brain health. These connections are areas for critical reading, not individual medical advice.' },
    { keys: ['dementia', 'cognitive'], text: 'The reading library includes material on dementia and cognitive decline in relation to systemic factors. For specific study findings, open the linked table and review its source references.' },
  ]

  const commandList = [
    ['/help', 'List all eight commands'],
    ['/overview', 'Summarise the guide'],
    ['/map', 'Explain the mind map'],
    ['/topic <word>', 'Find matching videos and PDFs'],
    ['/summarise <topic>', 'Get a short guide summary'],
    ['/videos', 'List the supplied videos'],
    ['/pdfs', 'List the six linked PDFs'],
    ['/quiz', 'Jump to the knowledge check'],
  ]

  function addMessage(role, text, links = []) {
    const wrapper = document.createElement('div')
    wrapper.className = `bot-message ${role === 'user' ? 'bot-user' : 'bot-reply'}`
    if (role !== 'user') {
      const avatar = document.createElement('span')
      avatar.className = 'bot-avatar'
      avatar.textContent = 'b.'
      wrapper.append(avatar)
    }

    const content = document.createElement('div')
    if (role !== 'user') {
      const label = document.createElement('small')
      label.textContent = 'GUIDE BOT · NOW'
      content.append(label)
    }
    const paragraph = document.createElement('p')
    paragraph.textContent = text
    content.append(paragraph)

    if (links.length) {
      const linkList = document.createElement('div')
      linkList.className = 'bot-result-links'
      for (const item of links) {
        const link = document.createElement('a')
        link.href = item.href
        link.textContent = `${item.kind} · ${item.title} ↗`
        if (item.href.endsWith('.mp4')) {
          link.target = '_blank'
          link.rel = 'noreferrer'
        }
        linkList.append(link)
      }
      content.append(linkList)
    }

    wrapper.append(content)
    botMessages.append(wrapper)
    botMessages.scrollTop = botMessages.scrollHeight
  }

  function matchesTopic(item, query) {
    const haystack = `${item.title} ${item.keywords}`.toLowerCase()
    return query.split(/\s+/).some((term) => term.length > 1 && haystack.includes(term))
  }

  function runCommand(raw) {
    const input = raw.trim()
    if (!input) return
    addMessage('user', input)

    const [commandToken = '', ...argumentParts] = input.split(/\s+/)
    const command = commandToken.toLowerCase()
    const argument = argumentParts.join(' ').replace(/[<>]/g, '').trim().toLowerCase()

    if (command === '/help') {
      addMessage('bot', `Here are the eight commands:\n${commandList.map(([name, description]) => `${name} — ${description}`).join('\n')}`)
    } else if (command === '/overview') {
      addMessage('bot', 'Part 1 explores Alzheimer’s disease through a wider holistic health lens. It introduces brain insulin signalling and energy use, systemic inflammation, gut–brain questions, the supplied mind map, four videos and six linked PDFs. The “Type 3 diabetes” phrase is an informal hypothesis, not a diagnosis.')
    } else if (command === '/map') {
      addMessage('bot', 'The supplied mind map groups themes around brain insulin resistance and energy, systemic inflammation, gut–brain connections and amyloid clearance. Treat it as a visual prompt for further reading: its proposed links are not settled medical conclusions.')
    } else if (command === '/topic') {
      if (!argument) {
        addMessage('bot', 'Add a search word after /topic. Try /topic gut or /topic dementia.')
      } else {
        const matches = [...guideTopics, ...documents, ...videos].filter((item) => matchesTopic(item, argument)).slice(0, 5)
        addMessage('bot', matches.length ? `I found ${matches.length} matching item${matches.length === 1 ? '' : 's'} for “${argument}”.` : `I couldn’t find a title or topic matching “${argument}”. Try brain, insulin, gut, inflammation, dementia, or diabetes.`, matches)
      }
    } else if (command === '/summarise') {
      if (!argument) {
        addMessage('bot', 'Add a topic after /summarise. Try /summarise gut brain.')
      } else {
        const found = summaries.find((entry) => entry.keys.some((key) => argument.includes(key) || key.includes(argument)))
        const matchingDocs = documents.filter((item) => matchesTopic(item, argument)).slice(0, 2)
        addMessage('bot', found ? found.text : `I only have short summaries for brain insulin and energy, inflammation, gut–brain themes, amyloid clearance, “Type 3 diabetes”, holistic context, and dementia. Try /topic ${argument} to find matching reading.`, matchingDocs)
      }
    } else if (command === '/videos') {
      addMessage('bot', 'Four Part 1 videos are included in the Watch & Listen section.', videos)
    } else if (command === '/pdfs') {
      addMessage('bot', 'The six Part 1 source PDFs are in the reading library.', documents)
    } else if (command === '/quiz') {
      addMessage('bot', 'The five-question knowledge check is ready when you are.', [{ title: 'Go to the quick quiz', href: '#quiz', kind: 'QUIZ' }])
    } else {
      addMessage('bot', 'I use eight slash commands and only search this site’s Part 1 guide content. Try /help to see them all.')
    }
  }

  botForm.addEventListener('submit', (event) => {
    event.preventDefault()
    runCommand(botInput.value)
    botInput.value = ''
    botInput.focus()
  })

  document.querySelectorAll('.bot-commands [data-command]').forEach((button) => {
    button.addEventListener('click', () => runCommand(button.dataset.command))
  })
}
