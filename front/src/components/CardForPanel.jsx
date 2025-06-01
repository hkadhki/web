

export const CardForPanel = () => {
    return (
            <div class="card">
            <div class="card-image">
              <img src="images/lamp_card.avif" alt="lamp" />
              <div class="btn-floating halfway-fab waves-effect waves-light grey darken-1"><i class="material-icons">add</i></div>
              <div class="btn grey lighten-5 grey-text text-darken-4 btnEdit"> <i class="material-icons">border_color</i></div>
            </div>
            <div class="card-content">
              <span class="card-title">Название</span>  
              <p>цена</p>
            </div>
          </div>
    )
}