<script>
  import { fly } from "svelte/transition";
  import { usedCredit, remainingCredit } from "./stores/SCAPI";

  let orgText = document.querySelector("#original");
  orgText ? (orgText = orgText.value) : (orgText = "");
  let spunText = document.querySelector("#spun");

  // let used = "";
  let remaining = "";
  let isLoading = false;
  // let spun = "";
  let promise;

  const getCreditInfo = async () => {
    remaining = await remainingCredit();
    // used = await usedCredit();
    // console.log(used);
  };
  const spinAPI = async () => {
    if (!orgText.trim()) {
      alert("Enter some text first");
      return;
    }
    isLoading = true;

    const res = await fetch(
      "http://api.spinnerchief.com:9001/apikey=api5acfcb6e9d514647b&username=netman&password=s3nt3ll082&spintype=1",
      {
        method: "post",
        body: orgText,
      }
    );
    const spun = await res.text();
    isLoading = false;
    return spun;
  };

  const handleClick = () => {
    promise = spinAPI();
    getCreditInfo();
  };
  let show = false;

  const copyText = (e) => {
    show = true;
    const article = document.querySelector("#spun");
    article.select();
    document.execCommand("copy");
    document.getSelection().collapseToEnd();
    setTimeout(() => {
      show = false;
    }, 2000);
  };

  const clearTextarea = () => {
    orgText = "";
  };
</script>

<svelte:head>
  <title>Article Spinner with Sveltekit</title>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
    integrity="sha512-Fo3rlrZj/k7ujTnHg4CGR2D7kSs0v4LLanw2qksYuRlEzO+tcaEPQogQ0KaoGN26/zrn20ImR1DfuLWnOo7aBA=="
    crossorigin="anonymous"
    referrerpolicy="no-referrer"
  />
</svelte:head>

<main class="justify-center flex flex-col items-center w-full">
  {#if show}
    <div
      class="message success  bg-green-400 text-white absolute top-0 right-0 p-3"
      transition:fly={{ y: 50, duration: 1000 }}
    >
      Copied to the clipboard!
    </div>
  {/if}

  <h1
    class="text-3xl sm:text-5xl drop-shadow-lg uppercase text-white mb-10 mt-10"
  >
    Article Spinner with Sveltekit 1
  </h1>

  <div class="relative w-full h-screen text-center">
    <p class="remaining w-72 m-auto text-center rounded-sm p-0 font-bold mb-5 ">
      Remaining credits for today: {remaining}
    </p>

    <i class="fas fa-copy visible" title="Copy" on:click={copyText} />
    <i
      class="fas fa-eraser visible"
      title="Clear the textarea"
      on:click={clearTextarea}
    />

    <div class="flex flex-row textareas w-5/6 m-auto">
      <div class="flex flex-col w-full">
        <label for="original" class="font-bold text-white">Original Text:</label
        >
        <textarea
          name="original"
          id="original"
          cols="30"
          rows="20"
          placeholder="copy/paste the original text here"
          class="w-full sm:w-full p-1 mr-2 outline-none focus:shadow-2xl transition-all"
          value={orgText}
          on:input={(e) => (orgText = e.target.value)}
        />
      </div>
      <div class="flex flex-col w-full">
        <label for="spun" class="font-bold text-white">Spun Text:</label>
        {#await promise}
          <textarea
            name="spun"
            id="spun"
            cols="30"
            rows="20"
            placeholder="Result will apear here"
            class="w-full sm:w-full p-1 ml-2 outline-none focus:shadow-2xl transition-all text-yellow-300"
            value="Please wait..."
          />
        {:then spun}
          <textarea
            name="spun"
            id="spun"
            cols="30"
            rows="20"
            placeholder="Result will apear here"
            class="w-full sm:w-full p-1 ml-2 outline-none focus:shadow-2xl transition-all"
            value={spun ? spun : ""}
          />
        {:catch err}
          <textarea
            name="spun"
            id="spun"
            cols="30"
            rows="20"
            placeholder="Result will apear here"
            class="w-full sm:w-full p-1 ml-2 outline-none focus:shadow-2xl transition-all text-red-500 bg-indigo-300"
            value={err.message}
          />
        {/await}
      </div>
    </div>

    <button
      disabled={isLoading}
      class="spin w-5/6 sm:w-5/6 p-5 mt-2 ml-2 text-3xl font-bold uppercase text-white  outline-none hover:bg-blue-500 rounded-md transition-all"
      on:click={handleClick}
    >
      {#if isLoading}
        <i class="fas fa-spinner fa-spin" /> Spinning...{:else}
        Spin it!{/if}</button
    >
  </div>
</main>

<style global lang="postcss">
  @import url("https://fonts.googleapis.com/css2?family=Eczar&display=swap");
  @import url(https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;800;900&display=swap);

  * {
    font-family: "Poppins", sans-serif;
    font-weight: normal;
  }
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  main {
    background: linear-gradient(to bottom left, #192a56, #273c75);
  }
  h1 {
    font-weight: bold;
    font-family: Eczar, "sans-serif";
  }
  #original,
  #spun {
    background-color: #353b48;
    color: white;
  }
  .fa-copy {
    position: absolute;
    top: 35px;
    right: 8%;
    padding: 5px;
    border: 1px solid rgb(200, 200, 200);
    border-radius: 3px;
    color: rgb(197, 197, 197);
    cursor: pointer;
    transition: all 0.3s ease;
  }
  .fa-eraser {
    position: absolute;
    top: 35px;
    left: 47%;
    padding: 5px;
    border: 1px solid rgb(200, 200, 200);
    border-radius: 3px;
    color: rgb(197, 197, 197);
    cursor: pointer;
    transition: all 0.3s ease;
  }
  .fa-copy:hover,
  .fa-eraser:hover {
    border: 1px solid rgb(255, 255, 255);
    color: rgb(255, 255, 255);
  }
  .fa-copy .visible {
    height: 3em;
    width: 10em;
    background: yellow;
  }
  .spin {
    background: linear-gradient(to left, #40739e, #487eb0);
  }
  .spin:hover {
    background: linear-gradient(to left, #487eb0, #40739e);
  }
  .remaining {
    color: #ccc;
    background-color: #40739e;
  }
</style>
