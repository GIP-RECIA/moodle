$( document ).ready( function( ) {
    $( '#user_000' ).find( ':checkbox' ).first( ).click( function( ) {
        var checkboxes = $( this ).parents( 'form' ).find( ':checkbox' ).prop( 'checked' , this.checked );
    });
});

