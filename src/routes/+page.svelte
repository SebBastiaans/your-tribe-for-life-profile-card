<script>
    import { onMount } from 'svelte';
    import mugshot from '$lib/assets/mugshot-za.png';
    import schoolfoto from '$lib/assets/schoolfotoYN.png';

    let { data } = $props();
    const person = data.person;

    onMount(() => {
        const mouse = document.querySelector('.back-card');

        mouse.addEventListener("mousemove", function (move) {
            mouse.style.setProperty("--y", move.offsetY + "px");
            mouse.style.setProperty("--x", move.offsetX + "px");
        });

        const main = document.querySelector('main');
        let dragging = false;
        let startX = 0;

        function endSwing() {
            if (!dragging) return;
            dragging = false;
            main.classList.remove('dragging');
            main.style.setProperty('--swing', '0deg');
        }

        main.addEventListener('pointerdown', (down) => {
            if (down.pointerType !== 'mouse') return;
            dragging = true;
            startX = down.clientX;
            main.setPointerCapture(down.pointerId);
            main.classList.add('dragging');
        });

        main.addEventListener('pointermove', (move) => {
            if (!dragging) return;
            const deltaX = move.clientX - startX;
            const angle = Math.max(-25, Math.min(25, -deltaX * 0.15));
            main.style.setProperty('--swing', angle + 'deg');
        });

        main.addEventListener('pointerup', endSwing);
        main.addEventListener('pointercancel', endSwing);
    });
</script>

<main>
    <section class="front-card">
        <h2 class="h-front">2026 profile card</h2>
        <img class="pic-front" src={mugshot} alt="Mugshot van {person.name}">
        <ul>
            <li>
                <p class="label">[Name]</p>
                <p>{person.name}</p>
            </li>
            <li>
                <p class="label">[Born]</p>
                <p>{person.birthdate}</p>
            </li>
            <li>
                <p class="label">[Length]</p>
                <p>{person.custom.length}cm</p>
            </li>
            <li>
                <p class="label">[Based in]</p>
                <p>{person.residency}</p>
            </li>
            <li>
                <p class="label">[Studying]</p>
                <p>{person.custom.studying}</p>
            </li>
        </ul>
    </section>

    <section class="back-card">
        <h2>YB</h2>
        <img src={schoolfoto} alt="Schoolfoto van {person.name}" width="200">
    </section>
</main>

<h1>Pak en gooi de kaart</h1>

<style>

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  line-height: 1.4;
}

@font-face{
  font-family: roboto;
  src: url(../lib/assets/fonts/RobotoMono-VariableFont_wght.ttf) format("truetype");
  font-weight: 100 700;
  font-display: swap;
}
@font-face{
  font-family: drawn;
  src: url(../lib/assets/fonts/DJGROSS.ttf) format("truetype");
  font-display: swap;
}

@keyframes --rotate-self{
  from{
    transform: rotateY(0deg);
  }
  to{
    transform: rotateY(180deg);
  }
}

main{
  display: grid;
  perspective: 50rem;
  transform-style: preserve-3d;
  position: fixed;
  left: 50%;
  transform: translateX(-50%) rotate(var(--swing, 0deg));
  transform-origin: top center;
  height: 600px;
  cursor: grab;

  &:not(:global(.dragging)){
    transition: transform .6s cubic-bezier(.34, 1.56, .64, 1);
  }

  &:global(.dragging){
    cursor: grabbing;
  }

  section{
    grid-area: 1/1;
    backface-visibility: hidden;
  }
}

h1{
transform: translateX(-50%);
left: 50%;
position: absolute;
bottom: -6rem;
width: max-content;
font-family: roboto;
}

.front-card{
  background-color: white;
  border-radius: 2rem;
  position: fixed;
  display: grid;
  grid-template-columns:300px 70px;
  grid-template-rows: auto auto;
  justify-items: center;

  animation-name: --rotate-self;  /* https://youtu.be/aaEvUfC14e4?si=XX5uYA9281zmRpEi */
  animation-timeline: scroll(inline);
  transform-origin: center;

  h2{
    background-color: #5a3821;
    color: white;
    border-radius: 0 2rem 2rem 0;
    width: 70px;
    position: absolute;
    writing-mode:vertical-lr;
    align-content: center;
    right: 0;
    height: 100%;
    text-align: center;
    font-family: Arial;
    font-size: 2.5rem;

    &:hover{
      font-family: drawn;
    }
  }

  img{
    align-self: center;
  }

  .pic-front{
    width: 240px;
    height: 310px;
    background: url(/assets/mugshot-za.png);
    background-size: cover;
    object-fit: cover;
    display: block;
  }

  ul{
    width: 240px;
    grid-row: 2;
    padding-block: 1rem;

    li{
      font-family: roboto;
      display: flex;
      flex-direction: column;
      border-bottom: dashed black;
      font-size: 20px;
      font-weight: 200;

      p{
        font-size: 16px;
      }

      &:hover{
        border-bottom: black solid;
        font-weight: 400;
      }
    }
  }
}

@keyframes --rotate-back{
  from{
    transform: rotateY(180deg);
  }
  to{
    transform: rotateY(360deg);
  } 
}

.back-card{
  width: 370px;
  background-color: white;
  border-radius: 2rem;
  display: flex;
  justify-content: center;
  transform: rotateY(180deg);

  animation-name: --rotate-back;
  animation-timeline: scroll(inline);
  transform-origin: center;

  &:hover{
    --x:100px;
    --y:100px;
    background: radial-gradient(at var(--x) var(--y), orangered 3%, white 70%);
  }

  h2{
    font-family: roboto;
    font-size: 2rem;
    position: absolute;
    left: 1rem;
    top: 1rem;
    border-bottom: black dashed;
    border-right: black dashed;
    padding-right: .5rem;
  }
}
</style>