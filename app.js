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
