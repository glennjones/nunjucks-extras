# Nunjucks Extras

A number of extra tags and filters for nunjucks lib


### with
```
{% with Model.obj, as='MyString' %}
   with: {{ MyString.text }}
{% endwith %}</br>

```

### includeWith
```
{% includeWith "include.mango", with={
    x:Model.d,
    y:Model.c
} %}<
```

### switch
```
{% switch Model.message %}

    {% case 'userUpdate' %}
        [t]We've updated your {{ Model.started|date() }} account details.[/t]

    {% case 'adminUpdate', 'UserDetailsUpdatedx' %}
        [t]We've updated your ADMIN account[/t]

    {% default %}
        {% trim %}text {{ Model.started|date() }} stuff{% endtrim %}

{% endswitch %}
```

### trim
```
{% trim %}
        This has some {{ Model.started|date() }} space around it

{% endtrim %}</br>
```

### versionedpath
```
{% versionedpath %}~/custom-assets/logo.png{% endversionedpath %}
```

### i18n
```
{% i18n %}This is english{% endi18n %}
```