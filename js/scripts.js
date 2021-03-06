/*-- START: Variables */
const $body = document.getElementById('body')
const $imageMovie = document.getElementById('imageMovie')
const $modalImageBG = document.getElementById('modalImageBG')
const $closeMovieModal = document.getElementById('closeMovieModal')
const $score = document.getElementById('score')
const $feedback = document.getElementById('feedback')
const $like = $feedback.querySelector('.fa-heart')
const $comment = $feedback.querySelector('.fa-comments')
const $modalCommentBG = document.getElementById('modalCommentBG')
const $modalComment = document.getElementById('modalComment')
const $share = $feedback.querySelector('.fa-share')
const $modalShareBG = document.getElementById('modalShareBG')
const $modalShare = document.getElementById('modalShare')
const $closeCommentModal = document.getElementById('closeCommentModal')
const $closeShareModal = document.getElementById('closeShareModal')
const $tooltip = document.getElementById('tooltip')
/*-- END: Variables */


/*-- START: Full Image Movie Modal */
function removeFadeOut() {
  $modalImageBG.classList.remove('fadeOut')
  $modalImageBG.removeEventListener('animationend', removeFadeOut)
}

function fadeOut() {
  $modalImageBG.classList.add('fadeOut')
  $modalImageBG.addEventListener('animationend', removeFadeOut)
}

function removeFadeIn() {
  $modalImageBG.classList.remove('fadeIn')
  $modalImageBG.removeEventListener('animationend', removeFadeIn)
}

function fadeIn() {
  $modalImageBG.classList.add('fadeIn')
  $modalImageBG.addEventListener('animationend', removeFadeIn)
}

function hideMovieModal() {
  $modalImageBG.classList.add('hide')
  $modalImageBG.classList.remove('modal-bg--movie')
  $modalImageBG.removeEventListener('animationend', hideMovieModal)
}

function closeImageModal(event) {
  if (event.target == $modalImageBG  || event.target == $closeMovieModal) {
    $body.classList.remove('overflow-hidden')
    fadeOut()
    $modalImageBG.addEventListener('animationend', hideMovieModal)
    $modalImageBG.removeEventListener('click', closeImageModal)
    $closeMovieModal.removeEventListener('click', closeImageModal)
  }
}

$imageMovie.addEventListener('click', () => {
  $body.classList.add('overflow-hidden')
  $modalImageBG.classList.remove('hide')
  $modalImageBG.classList.add('modal-bg--movie')
  fadeIn()
  $modalImageBG.addEventListener('click', closeImageModal)
  $closeMovieModal.addEventListener('click', closeImageModal)
})
/*-- END: Full Image Movie Modal */


/*-- START: Movie Score */
const score_stars = $score.querySelectorAll('i')
function addScore(score) {
  let scored_stars = []
  for (i = 1; i <= score; i++) {
    scored_stars.push($score.querySelector(`i[data-score='${i}']`))
  }
  scored_stars.forEach(scored_star => {
    scored_star.classList.add('scored')
  })
  window.localStorage.setItem('score',`${score}`)
}

(() => {
  if(window.localStorage.getItem('score')) {
    addScore(window.localStorage.getItem('score'))
  }
})()


score_stars.forEach(score_star => {
  function removeScorePress(event) {
    if (event.animationName === 'scorePress') {
      score_star.classList.remove('scorePress')
    }
    score_star.removeEventListener('animationend', removeScorePress)
  }
  score_star.addEventListener('click', event => {
    score_stars.forEach(score_star => score_star.classList.remove('scored'))
    score_star.classList.add('scorePress')
    score_star.addEventListener('animationend', removeScorePress)
    addScore(event.target.dataset.score)
  })
})
/*-- END: Movie Score */


/*-- START: Feedback */
// Info (Tooltip)
function removeTooltipShow(event) {
  if (event.animationName === 'tooltipShow') {
    $tooltip.classList.remove('tooltipShow')
  }
  $tooltip.removeEventListener('animationend', removeTooltipShow)
}
$body.addEventListener('mouseover', event => {
  if (event.target === $like) {
    const likesTotal = Number(window.localStorage.getItem('likeTemp')) + 1157
    $tooltip.querySelector('span').textContent = `${likesTotal} Likes`
    $tooltip.style.top = `calc(${$like.offsetTop}px - 55px)`;
    $tooltip.style.left = `calc(${$like.offsetLeft}px - 30px)`;
    $tooltip.classList.remove('hide')
    $tooltip.classList.add('tooltipShow')
    $tooltip.addEventListener('animationend', removeTooltipShow)
  } else if (event.target === $comment) {
    $tooltip.querySelector('span').textContent = '267 Comentarios'
    $tooltip.style.top = `calc(${$comment.offsetTop}px - 55px)`;
    $tooltip.style.left = `calc(${$comment.offsetLeft}px - 50px)`;
    $tooltip.classList.remove('hide')
    $tooltip.classList.add('tooltipShow')
    $tooltip.addEventListener('animationend', removeTooltipShow)
  } else if (event.target === $share) {
    $tooltip.querySelector('span').textContent = 'Compartido 27 veces'
    $tooltip.style.top = `calc(${$share.offsetTop}px - 55px)`;
    $tooltip.style.left = `calc(${$share.offsetLeft}px - 60px)`;
    $tooltip.classList.remove('hide')
    $tooltip.classList.add('tooltipShow')
    $tooltip.addEventListener('animationend', removeTooltipShow)
  } else {
    if (!$tooltip.classList.contains('hide')) {
      $tooltip.classList.add('hide')
    }
  }
})

// LIKE
function addLike(feedback) {
  if (feedback === 'like') {
    $like.classList.toggle('liked')
    if($like.classList.contains('liked')) {
      window.localStorage.setItem('liked', 'like')
      window.localStorage.setItem('likeTemp', '1')
    } else {
      window.localStorage.removeItem('liked')
      window.localStorage.setItem('likeTemp', '0')
    }
  }
}

(() => {
  if(window.localStorage.getItem('liked')) {
    addLike(window.localStorage.getItem('liked'))
  }
})()

function removeLikePress(event) {
  if (event.animationName === 'likePress') {
    $like.classList.remove('likePress')
  }
  $like.removeEventListener('animationend', removeLikePress)
}
$like.addEventListener('click', event => {
  $like.classList.add('likePress')
  $like.addEventListener('animationend', removeLikePress)
  addLike(event.target.dataset.feedback)
})

// COMMENT AND Share
function removeCommentPress(event) {
  if (event.animationName === 'commentPress') {
    $comment.classList.remove('commentPress')
  }
  $comment.removeEventListener('animationend', removeCommentPress)
}
function removePop() {
  if (event.animationName === 'popIn') {
    $modalComment.classList.remove('popIn')
  } else if (event.animationName === 'popOut') {
    $modalComment.classList.remove('popOut')
    $modalCommentBG.classList.add('hide')
  }
  $modalComment.removeEventListener('animationend', removePop)
}

function removeSharePress(event) {
  if (event.animationName === 'sharePress') {
    $share.classList.remove('sharePress')
  }
  $share.removeEventListener('animationend', removeSharePress)
}
function modalAnimation(event) {
  if (event.animationName === 'showToBottom') {
    $modalShare.classList.remove('showToBottom')
  } else if (event.animationName === 'hideToTop') {
    $modalShare.classList.remove('hideToTop')
    $modalShareBG.classList.add('hide')
  }
  $modalShare.removeEventListener('animationend', modalAnimation)
}

function closeModal(event) {
  if (event.target === $modalCommentBG || event.target === $closeCommentModal) {
    if (!$modalCommentBG.classList.contains('hide')) {
      $modalComment.classList.add('popOut')
      $modalComment.addEventListener('animationend', removePop)
      $modalCommentBG.removeEventListener('click', closeModal)
      $closeCommentModal.removeEventListener('click', closeModal)
    }
  } else if (event.target === $modalShareBG || event.target === $closeShareModal) {
    if (!$modalShareBG.classList.contains('hide')) {
      $modalShare.classList.add('hideToTop')
      $modalShare.addEventListener('animationend', modalAnimation)
      $modalShareBG.removeEventListener('click', closeModal)
      $closeShareModal.removeEventListener('click', closeModal)
    }
  }
}
// COMMENT
$comment.addEventListener('click', () => {
  $comment.classList.add('commentPress')
  $modalComment.classList.add('popIn')
  $comment.addEventListener('animationend', removeCommentPress)
  $modalCommentBG.classList.remove('hide')
  $modalCommentBG.addEventListener('click', closeModal)
  $closeCommentModal.addEventListener('click', closeModal)
})

// SHARE
$share.addEventListener('click', () => {
  $share.classList.add('sharePress')
  $share.addEventListener('animationend', removeSharePress)
  $modalShareBG.classList.remove('hide')
  $modalShare.classList.add('showToBottom')
  $modalShare.addEventListener('animationend', modalAnimation)
  $modalShareBG.addEventListener('click', closeModal)
  $closeShareModal.addEventListener('click', closeModal)
})
/*-- END: Feedback */
