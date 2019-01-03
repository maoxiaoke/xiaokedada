<template>
  <div>
    <p 
      data-height="265" 
      data-theme-id="light" 
      :data-slug-hash="hash" 
      data-default-tab="html,result" 
      data-user="maoxiake" 
      data-embed-version="2" 
      :data-pen-title="title" 
      class="codepen">See the Pen 
      <a :href="href">
        {{ title }}</a> by maoxiaoke (<a href="https://codepen.io/maoxiake">@maoxiake</a>) on 
        <a href="https://codepen.io">CodePen</a>.</p>
  </div>
</template>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>    
<script>
export default {
  props: {
    hash: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    href: {
      type: String,
      required: true
    }
  }
}
</script>
