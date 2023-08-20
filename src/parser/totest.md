remove utf8 from desirizalize object ?
remove utf8 validation and put it as new parameter
same for raw option

---

Do not do If not needed

```
 // Represents the key
    const name = isArray ? arrayIndex++ : ByteUtils.toUTF8(buffer, index, i);
```
