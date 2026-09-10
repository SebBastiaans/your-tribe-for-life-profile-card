<script>
    import mugshot from '$lib/assets/mugshot-za.png';
    import schoolfoto from '$lib/assets/schoolfotoYN.png';

    let { data } = $props();
    const person = data.person;
</script>

<main>
    <section class="front-card">
        <h2>2026 profile card</h2>
        <img src={mugshot} alt="Mugshot van {person.name}">
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
        <img src={schoolfoto} alt="Schoolfoto van {person.name}">
    </section>
</main>

<h1>Pak en gooi de kaart</h1>